import { Component, OnInit } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { CaptureGoalsComponent } from './capture-goals/capture-goals.component';

@Component({
  selector: 'app-attendence-register',
  templateUrl: './attendence-register.component.html',
  styleUrls: ['./attendence-register.component.css']
})
export class AttendenceRegisterComponent implements OnInit {

  modalDialog: MdbModalRef<CaptureGoalsComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private toastr: ToastrService,
  
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.modalDialog = this.modalService.open(CaptureGoalsComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });
  }
}
