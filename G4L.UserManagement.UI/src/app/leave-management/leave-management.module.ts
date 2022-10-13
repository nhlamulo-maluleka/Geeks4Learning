import { PipesModule } from './../shared/pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveManagementComponent } from './leave-management.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MaterialModule } from '../shared/material/material.module';

@NgModule({
  declarations: [ LeaveManagementComponent, LeaveRequestComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MdbModalModule,
    PipesModule,
    MaterialModule
  ]
})
export class LeaveManagementModule { }
