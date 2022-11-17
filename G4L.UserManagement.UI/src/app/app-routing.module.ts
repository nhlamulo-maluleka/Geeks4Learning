import { LoginComponent } from './usermanagement/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './usermanagement/register/register.component';
import { MasterLayoutComponent } from './master-layout/master-layout.component';
import { LoginGuard } from './usermanagement/login/guards/login.guard';

const routes: Routes = [
  // {
  //   path: 'register',
  //   component: RegisterComponent
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    loadChildren: () => import('./master-layout/master-layout.module').then(m => m.MasterLayoutModule),
    canActivate: [ LoginGuard ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
