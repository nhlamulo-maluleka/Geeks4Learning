import { animate, animation } from '@angular/animations';
import { formatDate } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
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
  image: any = '../assets/images/user.jpg';
  Userform: any;
  

  constructor(
    private formBuilder: FormBuilder,
    private sponsorService: SponsorService,
    private modalService: MdbModalService,
    private cdr: ChangeDetectorRef,
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
      Name: [sponsor?.name, [Validators.required]],
      Description: [sponsor?.description, [Validators.required]],
      Image: [sponsor?.image, [Validators.required]],
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
    this.formModel.markAllAsTouched();

    if (this.formModel.invalid){
      return;
    } 

    this.sponsorService.addSponsor('Sponsor' ,this.formModel.value).subscribe(
      () => {
        this.toastr.success(`${this.formModel.value.Name} added successfully`);
        this.modalRef.close(true);
      }
    );
  }

  updateSponsor(){
    this.formModel.markAllAsTouched();

    if (this.formModel.invalid){
      return;
    }

    this.sponsorService.updateSponsor('Sponsor' ,this.formModel.value).subscribe(
      () => {
        this.toastr.success(`${this.formModel.value.Name} updated successfully`);
        this.modalRef.close(true);
      }
    );
  }

  deleteSponsor(id: any){
    this.sponsorService.deleteSponsor(id).subscribe(() => {
      this.toastr.success(`The Sponsor was deleted successfully`);
      this.getAllSponsors();
    });
  }

  close(){
    this.modalRef.close();
  }
  
  @ViewChild('fileInput') el: ElementRef | undefined;
  editFile: boolean = true;
  removeUpload: boolean = false;  

  uploadFile(event:any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file); 
      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.image = reader.result;
        this.formModel.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cdr.markForCheck();        
    }
  }

}
