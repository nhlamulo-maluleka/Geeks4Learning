import { Component, OnInit } from '@angular/core';
import { LeaveStatus } from 'src/app/shared/global/leave-status';
import { LeaveTypes } from 'src/app/shared/global/leave-types';
import { UserService } from 'src/app/usermanagement/services/user.service';
import { setInterval } from 'timers';
import { LeaveService } from '../services/leave.service';

@Component({
  selector: 'app-leave-history-card',
  templateUrl: './leave-history-card.component.html',
  styleUrls: ['./leave-history-card.component.css']
})
export class LeaveHistoryCardComponent implements OnInit {
  leaves: any;
  users: any;
  skip: any = 0;
  take: any = 2;

  constructor(private leaveService: LeaveService, private userService: UserService) { }

  ngOnInit(): void {
      this.getLeaves(this.skip, this.take);
      this.skip += 1;

  }
  getLeaves(skip: number, take: number) {
    this.leaveService.getPagedLeaveApplications(skip, take).subscribe((response: any) => {
      this.leaves = response;
    })
    this.userService.getPagedUsers(skip, take).subscribe((response: any) => {
      this.users = response;
    })
  }
  getLeaveType(leaveType: any): any {
    switch (leaveType) {
      case LeaveTypes.Annual:
        return 'Annual Leave';
      default:
        undefined;
    }
  }
  getLeaveStatus(leaveStatus: any): any {
    switch (leaveStatus) {
      case LeaveStatus.Pending:
        return 'Mrs. M. Wilson';
      case LeaveStatus.Cancelled:
        return 'Cancelled'
      default:
        break;
    }
  }

}
