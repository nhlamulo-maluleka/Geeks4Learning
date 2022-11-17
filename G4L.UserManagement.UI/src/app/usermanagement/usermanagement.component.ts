import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EnrolComponent } from './enrol/enrol.component';
import { contants } from '../shared/global/global.contants';
import { Roles } from '../shared/global/roles';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css'],
})
export class UsermanagementComponent implements OnInit {

  users: any;
  userRole: any;
  modalDialog: MdbModalRef<EnrolComponent> | null = null;

  constructor(
    private userService: UserService,
    private modalService: MdbModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    // this.getPagedUsers(0, 10);
    this.userRole = sessionStorage.getItem(contants.role);
  }

  getPagedUsers(skip: number, take: number) {
     this.userService.getPagedUsers(skip, take).subscribe((response: any) => {
      this.filterUserByRole(response);
    });
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((response: any) => {
      this.filterUserByRole(response);
    });
  }

  filterUserByRole(response: any) {
    switch (this.userRole) {
      case Roles.Super_Admin:
        this.users = response.filter((x: any) => x.role !== Roles.Super_Admin);
        break;
      case Roles.Admin:
        this.users = response.filter(
          (x: any) => x.role !== Roles.Super_Admin && x.role !== Roles.Admin
        );
        break;
      default:
        this.users = response;
        break;
    }
  }

  openDialog(user?: any) {
    this.modalDialog = this.modalService.open(EnrolComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      data: { user: user, editCrucialInfo: true },
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });

    this.modalDialog.onClose.subscribe((isUpdated: boolean) => {
      if (isUpdated) this.getAllUsers();
    });
  }

  deleteUser(id: any) {
    this.userService.deleteUser(id).subscribe((response: any) => {
      this.toastr.success(`The user was successfully deleted`);
      this.getAllUsers();
    });
  }
}
