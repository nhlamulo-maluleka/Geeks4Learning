import { UsermanagementModule } from './../usermanagement/usermanagement.module';
import { MasterLayoutComponent } from './master-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { UsermanagementComponent } from '../usermanagement/usermanagement.component';
import { AdminGuard } from '../shared/guards/admin.guard';
import { LeaveManagementComponent } from '../leave-management/leave-management.component';
import { LeaveManagementModule } from '../leave-management/leave-management.module';
import { IkmManagementModule } from '../ikm-management/ikm-management.module';
import { IkmManagementComponent } from '../ikm-management/ikm-management.component';
import { AttendenceRegisterComponent } from '../attendence-register/attendence-register.component';
import { AttendenceRegisterModule } from '../attendence-register/attendence-register.module';

const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'user-management',
        component: UsermanagementComponent,
        canActivate: [AdminGuard]
      },
      {
        path: 'leave-management',
        component: LeaveManagementComponent,
      },
      {
        path: 'ikm-management',
        component: IkmManagementComponent,
      },
      {
        path: 'attendence-register',
        component: AttendenceRegisterComponent,
      }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule, DashboardModule, UsermanagementModule, LeaveManagementModule, IkmManagementModule, AttendenceRegisterModule
  ]
})
export class MasterLayoutRoutingModule {
  static components = [ MasterLayoutComponent ]
}
