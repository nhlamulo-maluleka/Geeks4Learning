import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { contants } from '../shared/global/global.contants';
import { LeaveStatus } from '../shared/global/leave-status';
import { LeaveTypes } from '../shared/global/leave-types';
import { Roles } from '../shared/global/roles';
import { TokenService } from '../usermanagement/login/services/token.service';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { HolidaysService } from './services/holidays.service';
import { LeaveService } from './services/leave.service';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {
  isAdmin: boolean | undefined;
  isTrainer: boolean | undefined;
  isLearner: boolean | undefined;

  modalDialog: MdbModalRef<LeaveRequestComponent> | null = null;
  leaveApplications: any[] = [];
  user: any;
  leaveBalances: any[] = [];
  dataSet: any;
  holidays: any[] = [];


  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService,
    private leaveService: LeaveService,
    private tokenService: TokenService,
    private holidaysService:HolidaysService
  ) { }

  ngOnInit(): void {
    const role = sessionStorage.getItem(contants.role);
    this.determinRole(role);
    this.user = this.tokenService.getDecodeToken();
    this.getLeaveApplication(this.user?.id);
    this.getLeaveBalances(this.user?.id);
    this.getHolidays();
  }
  getHolidays() {
    this.holidaysService.getHolidays().then((res: any) => {
      this.holidays = res;
      console.log("holidays " + this.holidays)
    })
  }
  getLeaveBalances(userId: any) {
    this.leaveService.getLeaveBalances(userId)
      .subscribe((response: any) => {
        this.leaveBalances = response;
      });
  }

  getLeaveApplication(userId: any) {
    this.leaveService.getLeaveApplications(userId)
      .subscribe(arg => {
        this.leaveApplications = arg;
      });
  }

  openDialog(leaveBalances: any[]) {
    this.modalDialog = this.modalService.open(LeaveRequestComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      data: { leaveBalances: leaveBalances },
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });

    this.modalDialog.onClose.subscribe((isUpdated: boolean) => {
      if (isUpdated) {
        this.getLeaveApplication(this.user?.id);
        this.getLeaveBalances(this.user?.id);
      }
    });
  }

  cancelApplication(leave: any) {
    // Cancl leave here
    leave.status = LeaveStatus.Cancelled;

    this.leaveService.updateLeave(leave)
      .subscribe(_ => {
        this.getLeaveApplication(this.user?.id);
        this.getLeaveBalances(this.user?.id);
      });

  }

  determinRole(role: string | null) {
    switch (role) {
      case Roles.Super_Admin:
      case Roles.Admin:
        this.isAdmin = true;
        break;
      case Roles.Trainer:
        this.isTrainer = true;
        break;
      case Roles.Learner:
        this.isLearner = true;
        break;
    }
  }

  setData(used: number, remaining: number) {
    this.dataSet = { used, remaining };
  }

  getPrimaryColor(balanceType: LeaveTypes) {
    switch (balanceType) {
      case LeaveTypes.Annual:
        return '#2d572b';
      case LeaveTypes.Sick:
        return '#2d2b57';
      case LeaveTypes.Family_Responsibility:
        return '#2a5d6b';
    }
    return;
  }

  getStatusIcon(status: any): any {
    switch (status) {
      case LeaveStatus.Pending:
        return 'fa-circle-pause'
      case LeaveStatus.Approved:
        return 'fa-circle-check green-text'
      case LeaveStatus.Partially_Approved:
        return 'fa-circle-half-stroke g4l-green'
      case LeaveStatus.Cancelled:
        return 'fa-ban red-text'
      case LeaveStatus.Rejected:
        return 'fa-circle-xmark red-text'
      default:
        break;
    }
  }
}
