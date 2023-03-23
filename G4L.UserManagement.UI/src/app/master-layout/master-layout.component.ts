import { Component, OnInit } from '@angular/core';
import { EventService } from '../leave-management/services/event.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { CaptureGoalsComponent } from '../goal-management/capture-goals/capture-goals.component';
import { AttendanceService } from '../attendance-register/services/attendance.service';
import { TokenService } from '../user-management/login/services/token.service';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.css']
})
export class MasterLayoutComponent implements OnInit {

  modalDialog: MdbModalRef<CaptureGoalsComponent> | null = null;
  modalRef: any;
  time: any;
  testTime: any
  attendance: any;

  constructor(private tokenService: TokenService, private attendanceService: AttendanceService,
    private modalService: MdbModalService,
    private toastr: ToastrService,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    var time: any = sessionStorage.getItem("times")
    this.captureGoal();
    let user: any = this.tokenService.getDecodeToken();
    this.attendanceService.getAttendances(user.id).subscribe((res: any = []) => {
      res.forEach((res: any) => {
        this.attendance = res
      })
    })
    this.getPublicHoildays("en%2Esa%23holiday%40group%2Ev%2Ecalendar%2Egoogle%2Ecom");
  }

  captureGoal() {
    this.testTime = (new Date(Date.now()).getMinutes());
    var time: any = sessionStorage.getItem("times")
    if (this.testTime == time) {
      this.modalDialog = this.modalService.open(CaptureGoalsComponent, {
        animation: true,
        backdrop: true,
        data: { attendance: this.attendance },
        containerClass: 'modal top fade modal-backdrop',
        ignoreBackdropClick: false,
        keyboard: true,
        modalClass: 'modal-xl modal-dialog-centered',
      });
    }
    console.log(this.testTime);
  }

  getPublicHoildays(calendarId: string) {
    this.eventService.getCalendarEvents(calendarId);
  }
}
