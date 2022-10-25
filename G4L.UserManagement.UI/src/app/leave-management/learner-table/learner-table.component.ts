import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { LeaveStatus } from 'src/app/shared/global/leave-status';
import { Roles } from 'src/app/shared/global/roles';
import { UserService } from 'src/app/usermanagement/services/user.service';
import { LeaveComponent } from '../leave/leave.component';
import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-learner-table',
  templateUrl: './learner-table.component.html',
  styleUrls: ['./learner-table.component.css']
})
export class LearnerTableComponent implements OnInit {
  filterTerm: any;
  modalDialog: MdbModalRef<LeaveComponent> | null = null;
  leaveApplications: any[] = [];
  users: any;
  prev: number = 0;
  next: number = 0;
  take: any = 5;
  constructor(private _leaveService: LeaveService, private _userService: UserService, private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.getAllUsers(0, 5);
    this.getPagedRequests(0, 5);
  }
  getPagedRequests(skip: number, take: any) {
    this._leaveService.getPagedLeaveApplications(skip, take).subscribe((response: any) => {
      this.leaveApplications = response;
    })
  }
  openDialog(requests?: any, user?: any) {
    this.modalDialog = this.modalService.open(LeaveComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      data: { requests: requests, user: user },
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });
  }
  getAllUsers(skip: number, take: number) {
    this._userService.getPagedUsers(skip, take).subscribe((response: any) => {
      this.users = response;
      console.log(this.users)
    });

  }
  getIcons(status: any): any {
    switch (status) {
      case LeaveStatus.Approved:
        return 'fa-solid fa-circle-check';
      case LeaveStatus.Cancelled:
        return 'fa-solid fa-ban';
      case LeaveStatus.Partially_Approved:
        return 'fa-solid fa-circle-half-stroke';
      case LeaveStatus.Pending:
        return 'fa-solid fa-circle-pause';
      case LeaveStatus.Rejected:
        return 'fa-solid fa-circle-xmark red-text';
      default:
        undefined;
    }
  }
  onChange(event: Event) {
    this.getPagedRequests(0, (event.target as HTMLInputElement).value);
    this.take = (event.target as HTMLInputElement).value;
  }
  getPagesPrevious() {
    if (this.next > 0) {
      this.next -= 1;
      this.getPagedRequests(this.next, this.take);
    }
  }
  getPagesNext() {
    if (this.next >= 0) {
      this.next += 1;
      this.getPagedRequests(this.next, this.take);
    }
  }
  one() {
    this.next = 0;
    this.getPagedRequests(this.next, this.take);
  }
  two() {
    this.next = 1;
    this.getPagedRequests(this.next, this.take);
  }
  three() {
    this.next = 2;
    this.getPagedRequests(this.next, this.take);
  }
}
