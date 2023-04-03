import { Injectable } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AttendanceService } from 'src/app/attendance-register/services/attendance.service';
import { CaptureGoalsComponent } from '../../modals/capture-goals/capture-goals.component';
import { CreateGoalTaskComponent } from '../../modals/create-goal-task/create-goal-task.component';
import { GoalModel, viewType } from '../../models/goal-model';
import { GoalManagementService } from '../api/goal-management.service';
import { GoalModalHandlerService } from '../modals/goal-modal-handler.service';
import { GoalButtonActionService } from './goal-button-action.service';

@Injectable({
  providedIn: 'root',
})
export class CaptureGoalService {
  private currentGoal!: GoalModel;

  constructor(
    private attendanceService: AttendanceService,
    private goalManagementService: GoalManagementService,
    private mdbModalService: GoalModalHandlerService<any>,
    private goalButtonActionService: GoalButtonActionService
  ) { }

  public openCaptureGoalDialog(attendance?: any) {
    this.mdbModalService.openMdbModal<CaptureGoalsComponent>({
      component: CaptureGoalsComponent,
      data: { attendance: attendance ? attendance : null },
      ignoreBackdropClick: false,
      width: 50
    })
  }

  // public openAddGoalTaskDialog(goalObject: GoalModel, modalViewType: viewType = "create") {
  //   // Set the current goal reference
  //   this.currentGoal = goalObject;

  //   // this.onTaskCreation(, modalViewType)
  // }

  public onTaskCreation(
    taskRef: MdbModalRef<CreateGoalTaskComponent>,
    goal: GoalModel,
    modalViewType: viewType = "create"): void {
    taskRef.onClose.subscribe((newTask: string | null) => {
      if (newTask) {
        goal['tasks']?.push({
          title: newTask,
          complete: false,
          goalId: goal.id
        })
        /**
         * If creating a task for an existing goal
         * in the view-goal, update database
        */
        if (modalViewType === "view") {
          this.goalManagementService.updateGoal(this.currentGoal)
            .subscribe((updatedGoal: GoalModel) => {
              this.goalButtonActionService.calculateTaskCompletion(this.currentGoal);
              console.log(updatedGoal)
            })
        }
      }
    })
  }
}
