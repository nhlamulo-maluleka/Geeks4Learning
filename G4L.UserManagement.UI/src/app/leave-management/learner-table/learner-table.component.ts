import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
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
  filterTerm:any;
  modalDialog: MdbModalRef<LeaveComponent> | null = null;
  leaveApplications: any[] = [];
  users: any;
  constructor(private _leaveService: LeaveService, private _userService: UserService,private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllLeaveApplications()
  }
  getAllLeaveApplications() {
    this._leaveService.getAllLeaveApplications().subscribe((response: any) => {
      this.leaveApplications = response;
    })
  }
  openDialog(user?: any) {
    this.modalDialog = this.modalService.open(LeaveComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      data: { user: user, editCrucialInfo: true },
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });
  }
  getAllUsers() {
    this._userService.getAllUsers().subscribe((response: any) => {
      this.users = response;
      console.log(this.users)
    });

  }


}
