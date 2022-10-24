import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { contants } from 'src/app/shared/global/global.contants';
import { LeaveStatus } from 'src/app/shared/global/leave-status';
import { Roles } from 'src/app/shared/global/roles';
import { Streams } from 'src/app/shared/global/streams';
import { UserService } from 'src/app/usermanagement/services/user.service';


@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  isAdmin: boolean | undefined;
  isTrainer: boolean | undefined;
  isLearner: boolean | undefined;
  formModel: any;
  requests: any | null = null;
  userRole: string | null = null;
  serverErrorMessage: any;
  editCrucialInfo: boolean = false;
  allusers: any;
  user: any | null = null;

  constructor(
    public modalRef: MdbModalRef<LeaveComponent>,
    private toastr: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
    const role = sessionStorage.getItem(contants.role);
    this.determinRole(role);
  }
  getUsers() {
    this.userService.getAllUsers().subscribe((response: any) => {
      this.allusers = response;
      console.log(this.user);
      console.log(this.requests);
    });
  }


  close() {
    this.modalRef.close();
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

}

