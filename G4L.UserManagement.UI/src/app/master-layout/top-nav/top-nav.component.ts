import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { contants } from 'src/app/shared/global/global.contants';
import { SponsorComponent } from 'src/app/usermanagement/sponsor/sponsor.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ToastrService } from 'ngx-toastr';
import { SponsorService } from 'src/app/usermanagement/services/sponsor.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css'],
})
export class TopNavComponent implements OnInit {
  navItems: string[] = [];
  url: string = '';
  username: string | null = null;
  filterTerm!: string;
  modalDialog!: MdbModalRef<SponsorComponent>;
  sponsors: any;


  constructor(
    private router: Router,
    private modalService: MdbModalService,
    private toastr: ToastrService,
    private sponsorService: SponsorService,) {
    this.username = sessionStorage.getItem(contants.username);

    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.url = this.router.url.replace('/', '').replace('-', ' ');
      }
    });

  }

  ngOnInit(): void {
    this.getAllSponsors();
    console.log(this.filterTerm);}

  getAllSponsors() {
    this.sponsorService.getAllSponsors().subscribe((response: any) => {
      this.sponsors = response;
    });
  }

  openDialog() {
    this.modalDialog = this.modalService.open(SponsorComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });

    this.modalDialog.onClose.subscribe((isUpdated: boolean) => {
      if (isUpdated) {
        this.toastr.success('Sponsor updated successfully');
        this.getAllSponsors();
      }
    });
  }

  deleteSponsor(id: any) {
    this.sponsorService.deleteSponsor(id).subscribe((response: any) => {
      this.toastr.success(`${response.name} deleted successfully`);
      this.getAllSponsors();
    });
  }
  
  logout() {
    sessionStorage.clear();
    window.location.reload();
  }  
}
