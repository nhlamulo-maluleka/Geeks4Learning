import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendenceRegisterComponent } from './attendence-register.component';
import { CaptureGoalsComponent } from './capture-goals/capture-goals.component';



@NgModule({
  declarations: [ AttendenceRegisterComponent, CaptureGoalsComponent ],
  imports: [
    CommonModule
  ]
})
export class AttendenceRegisterModule { }
