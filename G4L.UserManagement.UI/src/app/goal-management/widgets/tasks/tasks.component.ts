import { Component, Input, OnInit } from '@angular/core';
import { GoalModel, goalStatus, viewType } from '../../models/goal-model';
import { CaptureGoalService } from '../../services/logic-handlers/capture-goal.service';
import { GoalButtonActionService } from '../../services/logic-handlers/goal-button-action.service';
import { GoalManagementService } from '../../services/api/goal-management.service';
import { GoalModalHandlerService } from '../../services/modals/goal-modal-handler.service';
import { CreateGoalTaskComponent } from '../../modals/create-goal-task/create-goal-task.component';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  @Input()
  goal!: GoalModel;

  @Input()
  viewType!: viewType

  @Input()
  goalStatus!: goalStatus

  constructor(
    private goalManagementService: GoalManagementService,
    private captureGoalService: CaptureGoalService,
    private goalButtonActionService: GoalButtonActionService,
    private mdbModalService: GoalModalHandlerService<any>
  ) { }

  toggleTaskForCompletion(element: any) {
    const { target: { id } } = element;

    if (this.goal.tasks) {
      this.goal.tasks[id].complete = !this.goal?.tasks[id]?.complete

      if (this.viewType === "view") {
        this.goalManagementService.updateGoal(this.goal)
          .subscribe((updatedGoal: GoalModel) => {
            console.log(updatedGoal)
            this.goalButtonActionService.calculateTaskCompletion(updatedGoal);
          })
      }
    }
  }

  removeTask(element: any): void {
    const { target: { id } } = element;

    if (this.goal.tasks) {
      this.goal.tasks.splice(id, 1)

      if (this.viewType === "view") {
        this.goalManagementService.updateGoal(this.goal)
          .subscribe((updatedGoal: GoalModel) => {
            console.log(updatedGoal)
            this.goalButtonActionService.calculateTaskCompletion(updatedGoal);
          })
      }
    }
  }

  addMoreTasks() {
    const createTaskModalReference: MdbModalRef<CreateGoalTaskComponent> = this.mdbModalService.openMdbModal<CreateGoalTaskComponent>({
      component: CreateGoalTaskComponent,
      data: null,
      ignoreBackdropClick: false,
      width: 50
    })

    this.captureGoalService.onTaskCreation(
      createTaskModalReference,
      this.goal,
      "view");
  }
}
