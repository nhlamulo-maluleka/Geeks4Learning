import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AttendanceService } from 'src/app/attendance-register/services/attendance.service';
import {
  maxToastrTimeout,
  minGoalDuration,
} from 'src/app/shared/constants/goal-boundaries';
import { ToastrMessagesService } from 'src/app/shared/utils/services/toastr-messages.service';
import {
  GoalCommentModel,
  GoalModel,
  GoalTaskModel,
} from '../../models/goal-model';
import { GoalManagementService } from '../../services/api/goal-management.service';
import { CaptureGoalService } from '../../services/logic-handlers/capture-goal.service';
import { CreateGoalTaskComponent } from '../create-goal-task/create-goal-task.component';
import { GoalModalHandlerService } from '../../services/modals/goal-modal-handler.service';

@Component({
  selector: 'app-capture-goals',
  templateUrl: './capture-goals.component.html',
  styleUrls: ['./capture-goals.component.css'],
})
export class CaptureGoalsComponent implements OnInit {
  attendanceId: any;

  formModel: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    duration: new FormControl(null, [Validators.required]),
    description: new FormControl(''),
  });

  currentGoal: GoalModel = {
    title: String(''),
    description: String(''),
    duration: String('00:00:00'),
    pausedCount: 0,
    archiveCount: 0,
    goalStatus: 'backlog',
    timeRemaining: String('00:00:00'),
    comment: new Array<GoalCommentModel>(),
    tasks: new Array<GoalTaskModel>(),
    userId: String(''),
  };

  constructor(
    private modalRef: MdbModalRef<CaptureGoalsComponent>,
    private goalManagementService: GoalManagementService,
    private captureGoalService: CaptureGoalService,
    private toastrMessage: ToastrMessagesService,
    private mdbModalService: GoalModalHandlerService<any>,
    private attendanceService: AttendanceService
  ) { }

  ngOnInit(): void { }

  getFormControl(name: string): AbstractControl {
    return this.formModel.controls[name];
  }

  isFormControlTouched(name: string): boolean {
    return this.getFormControl(name).touched;
  }

  isFormControlInvalid(name: string): boolean {
    return this.getFormControl(name).invalid;
  }

  setGoalValues(title: string, duration: string, description: string): void {
    this.currentGoal.title = title;
    this.currentGoal.duration = duration.concat(':00');
    this.currentGoal.description = description;
    this.currentGoal.timeRemaining = duration.concat(':00');
  }

  closeCaptureGoalModal() {
    this.modalRef.close();
  }

  addGoalTask(): void {
    const createTaskModalReference: MdbModalRef<CreateGoalTaskComponent> = this.mdbModalService.openMdbModal<CreateGoalTaskComponent>({
      component: CreateGoalTaskComponent,
      data: null,
      ignoreBackdropClick: false,
      width: 50
    })

    this.captureGoalService.onTaskCreation(
      createTaskModalReference,
      this.currentGoal);
  }

  addNewGoal() {
    this.formModel.markAllAsTouched();

    if (this.formModel.invalid) return;

    // Extracting duration timeparts (hours & minutes)
    const [hours, minutes] = this.getFormControl('duration').value.split(':');

    // Business rule [Goals must have a minumum duration of 25 minutes]
    if (+hours === 0 && +minutes < 25) {
      this.toastrMessage.showErrorMessage(
        'Create New Goal',
        `Cannot set a goal with a duration less than ${minGoalDuration} minutes`,
        maxToastrTimeout
      );
      return;
    }

    this.setGoalValues(
      this.getFormControl('title').value,
      this.getFormControl('duration').value,
      this.getFormControl('description').value
    );

    // console.log(this.currentGoal);
    this.goalManagementService.insertNewGoal(this.currentGoal);

    this.closeCaptureGoalModal();
  }
}
