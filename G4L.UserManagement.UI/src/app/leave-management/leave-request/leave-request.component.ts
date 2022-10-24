import { LeaveDayType } from './../../shared/global/leave-day-type';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { LeaveTypes } from 'src/app/shared/global/leave-types';
import { TokenService } from 'src/app/usermanagement/login/services/token.service';
import { LeaveService } from '../services/leave.service';
import { LeaveStatus } from 'src/app/shared/global/leave-status';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {

  formModel: any;
  userId: any;
  daysAvailable: number | undefined = 0;
  daysRemaining: number = 0;

  keys = Object.keys;

  leaveTypes = LeaveTypes;
  leaveBalance: { leaveType: LeaveTypes; days: number; }[] = [];
  negativeDays: boolean = false;

  daysType = LeaveDayType;
  leaveSchedule: { date: Date; leaveDayType: LeaveDayType; }[] = [];

  constructor(
    public modalRef: MdbModalRef<LeaveRequestComponent>,
    private formBuilder: FormBuilder,
    private leaveService: LeaveService,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.buildForm();
    this.getLeaveDays();
  }

  getLeaveDays() {
    this.leaveService.getLeaveBalance().subscribe((response: any) => {
      this.leaveBalance = response;
      console.log(response);
    });
  }

  buildForm() {
    this.formModel = this.formBuilder.group({
      userId: [this.userId],
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      comments: [''],
      usedDays: ['', Validators.required ],
      status: [ LeaveStatus.Pending ],
      approvers: this.formBuilder.array([
        {
          "userId": "156b5e89-99ad-47aa-2895-08da80ffdfed",
          "status": "Pending",
          "comments": ""
        },
        {
          "userId": "d0ad240b-dbc2-4458-65ce-08da9afed6cb",
          "status": "Pending",
          "comments": ""
        }
      ]), // How do we know who will approver
      documents: [[]]
    });
  }

  calculateDaysRequested() {
    let difference = this.getBusinessDatesCount(this.formModel.get('startDate').value, this.formModel.get('endDate').value);
    this.formModel.get('usedDays').patchValue(difference);
    return Number(this.formModel.get('usedDays').value);
  }

  getBusinessDatesCount(startDate: any, endDate: any) {
    let count = 0;
    let curDate = +startDate;
    while (curDate <= +endDate) {
      const dayOfWeek = new Date(curDate).getDay();
      const isWeekend = (dayOfWeek === 6) || (dayOfWeek === 0);
      if (!isWeekend) {
        count++;
      }
      curDate = curDate + 24 * 60 * 60 * 1000
    }
    return count;
  }

  calculateDaysRemaining(): number | undefined {
    this.negativeDays = false;

    switch (this.formModel.get('leaveType').value) {
      case LeaveTypes.Annual:
        this.daysAvailable = this.leaveBalance.find(x => x.leaveType === LeaveTypes.Annual)?.days;
        break;
      case LeaveTypes.Family_Responsibility:
        this.daysAvailable = this.leaveBalance.find(x => x.leaveType === LeaveTypes.Family_Responsibility)?.days;
        break;
      case LeaveTypes.Sick:
        this.daysAvailable = this.leaveBalance.find(x => x.leaveType === LeaveTypes.Sick)?.days;
        break;
      default:
        return 0;
    }

    if (this.daysAvailable) {
      this.daysRemaining = this.daysAvailable - this.calculateDaysRequested();

      // display the error message
      if (this.daysRemaining < 0) {
        this.negativeDays = true;
      }

      return this.daysRemaining;
    }

    return undefined;
  }

  applyForLeave() {
    this.leaveService.applyForLeave(this.formModel.value).subscribe(_ => {
      this.toastr.success(`Your leave was successfully created.`);
      this.modalRef.close(true);
    });
  }

  onOptionsSelected(event: any) {
    this.leaveSchedule = [];
    const startDate = new Date(this.formModel.get('startDate').value);
    switch (this.formModel.get('leaveDayDuration').value) {
      case LeaveDayType.Half_day:
        for (let index = 0; index < this.calculateDaysRequested(); index++) {
          let newDate = startDate.setDate(startDate.getDate() + 1);
          this.leaveSchedule.push({ date: new Date(newDate), leaveDayType: LeaveDayType.All_day });
        }
        console.log(this.leaveSchedule);
        break;
      default:
        break;
    }
  }

  close() {
    this.modalRef.close();
  }

}
