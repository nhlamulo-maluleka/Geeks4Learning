import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { LeaveRequestComponent } from './leave-request/leave-request.component';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {

  modalDialog: MdbModalRef<LeaveRequestComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
  }

  openDialog() {
    this.modalDialog = this.modalService.open(LeaveRequestComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      data: { },
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });

    this.modalDialog.onClose.subscribe((isUpdated: boolean) => {
      if (isUpdated) return; // this.getLeaveRequest();
    });
  }

}
