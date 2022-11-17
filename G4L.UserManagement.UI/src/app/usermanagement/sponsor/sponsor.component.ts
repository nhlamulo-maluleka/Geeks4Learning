import { animate, animation } from '@angular/animations';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { contants } from 'src/app/shared/global/global.contants';
import { environment } from 'src/environments/environment';
import { SponsorService } from '../services/sponsor.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent implements OnInit {
  formModel: any;

  keys = Object.keys;

  sponsor: any | null = null;
  sponsors: any;
  modalDialog: MdbModalRef<SponsorComponent> | null = null;
  

  constructor(
    private formBuilder: FormBuilder,
    private sponsorService: SponsorService,
    private modalService: MdbModalService,
    public modalRef: MdbModalRef<SponsorComponent>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm(this.sponsor);
    this.getAllSponsors();
  }

  getAllSponsors() {
    this.sponsorService.getAllSponsors().subscribe(
      (res: any) => {
        this.sponsors = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }


  buildForm(sponsor?: any) {
    this.formModel = this.formBuilder.group({
      Id: [sponsor?.id],
      Name: [sponsor?.name, [Validators.required]],
      Description: [sponsor?.description],
      Image: [sponsor?.image]
    });
  }

openDialog(sponsor?: any) {
  this.modalDialog = this.modalService.open(SponsorComponent, {
    animation: true,
    backdrop: true,
    containerClass: 'modal top fade modal-backdrop',
    data: { sponsor: sponsor, editCrucialInfo: true },
    ignoreBackdropClick: false,
    keyboard: true,
    modalClass: 'modal-xl modal-dialog-centered',
});

  this.modalDialog.onClose.subscribe((isUpdated: boolean) => {
    if (isUpdated) this.getAllSponsors();
  });
}

  addSponsor(){
    this.sponsorService.addSponsor('Sponsor' ,this.formModel.value).subscribe(
      () => {
        this.toastr.success(`${this.formModel.value.Name} added successfully`);
        this.modalRef.close(true);
      }
    );
  }

  updateSponsor(){
    this.sponsorService.updateSponsor('Sponsor' ,this.formModel.value).subscribe(
      () => {
        this.toastr.success(`${this.formModel.value.Name} updated successfully`);
        this.modalRef.close(true);
      }
    );
  }

  deleteSponsor(id: any){
    this.sponsorService.deleteSponsor(id).subscribe((response: any) => {
      this.toastr.success(`${response.name} deleted successfully`);
      this.getAllSponsors();
    });
  }

  close(){
    this.modalRef.close();
  }
}
