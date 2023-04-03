import { Injectable } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { maxCustomToastrTimeout, maxPauseCount, maxToastrTimeout } from 'src/app/shared/constants/goal-boundaries';
import { archivedState, backlogState, completedState, pausedState, startedState } from 'src/app/shared/constants/goal-states';
import { getTimeFormattedString } from 'src/app/shared/utils/utils';
import { ToastrMessagesService } from 'src/app/shared/utils/services/toastr-messages.service';
import { AddExtraGoalTimeComponent } from '../../modals/add-extra-goal-time/add-extra-goal-time.component';
import { ViewSelectedGoalComponent } from '../../modals/views/view-selected-goal/view-selected-goal.component';
import { GoalModel, goalTypes, goalStatus, GoalTaskModel } from '../../models/goal-model';
import { GoalManagementService } from '../api/goal-management.service';
import { getCompletedTasks, getRandomCustomPauseMessage, getRandomCustomSuccessMessage, transferGoal } from '../helpers/goal-service.helpers';
import { ButtonActionParameters } from '../interfaces/view-goal.interface';
import { GoalValidationHandlerService } from '../validations/goal-validation-handler.service';
import { ActiveGoalService } from './active-goal.service';
import { GoalCommentService } from './goal-comment.service';

@Injectable({
  providedIn: 'root'
})
export class GoalButtonActionService {
  private viewGoalModalRef!: MdbModalRef<ViewSelectedGoalComponent>;
  private goalProgress: number = 0;

  constructor(
    private goalManagementService: GoalManagementService,
    private toastrMessages: ToastrMessagesService,
    private activeGoalService: ActiveGoalService,
    private goalCommentService: GoalCommentService,
    private goalValidationsService: GoalValidationHandlerService
  ) { }

  public performButtonAction({ actionType, goal, modalReference }: ButtonActionParameters) {
    this.setViewGoalModalReference(modalReference);

    switch (actionType) {
      case "start":
        this.startGoal(goal)
        break;
      case "pause":
        this.pauseGoal(goal)
        break;
      case "complete":
        this.completeGoal(goal)
        break;
      case "archive":
        this.archiveGoal(goal)
        break;
      case "restore":
        this.restoreGoal(goal)
        break;
      case "resume":
        this.resumeGoal(goal)
        break;
    }
  }

  private setViewGoalModalReference(modalRef: MdbModalRef<ViewSelectedGoalComponent>): void {
    this.viewGoalModalRef = modalRef;
  }

  private getViewGoalModalReference(): MdbModalRef<ViewSelectedGoalComponent> {
    return this.viewGoalModalRef;
  }

  private closeViewGoalModal(): void {
    this.getViewGoalModalReference().close();
  }

  private getGoalTypeObjectList(): goalTypes {
    return this.goalManagementService.getGoalTypeObjectList();
  }

  private pauseGoalDBUpdate(goal: GoalModel) {
    // Changing the goal state
    goal.goalStatus = pausedState;

    // Incrementing the [pauseCount]
    goal.pausedCount += 1;

    // Updating goal changes in the database
    this.goalManagementService.updateGoal(goal)
      .subscribe((response: GoalModel) => {
        console.log(response)

        transferGoal(
          this.getGoalTypeObjectList().started,
          this.getGoalTypeObjectList().paused,
          goal
        )

        this.activeGoalService.deactivateCurrentActiveGoal();

        this.toastrMessages.showInfoMessage(
          "Encouragement",
          getRandomCustomPauseMessage(),
          maxCustomToastrTimeout)
      })
  }

  private archiveGoalDBUpdate(goal: GoalModel) {
    // Store the previous status for use later
    const previousGoalContainer: goalStatus = goal.goalStatus;

    // Change the goal status
    goal.goalStatus = archivedState;

    // Updating goal changes in the database
    this.goalManagementService.updateGoal(goal)
      .subscribe((response: GoalModel) => {
        console.log(response)

        switch (previousGoalContainer) {
          case backlogState:
            transferGoal(
              this.getGoalTypeObjectList().backlog,
              this.getGoalTypeObjectList().archived,
              goal
            )
            break;
          case startedState:
            transferGoal(
              this.getGoalTypeObjectList().started,
              this.getGoalTypeObjectList().archived,
              goal
            )
            this.activeGoalService.deactivateCurrentActiveGoal();
            break;
          case pausedState:
            transferGoal(
              this.getGoalTypeObjectList().paused,
              this.getGoalTypeObjectList().archived,
              goal
            )
            break;
        }

        this.closeViewGoalModal();

        if (goal.archiveCount % 3 === 0)
          this.toastrMessages.showInfoMessage(
            "Archive Goal",
            "Please note that frequent archiving of your goals may affect your progress tracking and hinder your ability to achieve your desired outcomes.",
            maxToastrTimeout);
      })
  }

  private startGoal(goal: GoalModel): void {
    // Guard condition
    if (!this.goalValidationsService.canGoalBeStarted(this.getGoalTypeObjectList().started)) return;

    // Proceed starting the goal
    if (goal.goalStatus === backlogState) {
      goal.goalStatus = startedState

      this.goalManagementService.updateGoal(goal)
        .subscribe((response: GoalModel) => {
          console.log(response)

          transferGoal(
            this.getGoalTypeObjectList().backlog,
            this.getGoalTypeObjectList().started,
            goal
          )

          // Start the newly created goal in the started list
          this.activeGoalService.activateGoalCountDown(this.getGoalTypeObjectList().started[this.getGoalTypeObjectList().started.length - 1]);

          // Close the modal
          this.closeViewGoalModal();
        })
    }
    else if (goal.goalStatus === archivedState) {
      goal.goalStatus = startedState

      this.goalManagementService.updateGoal(goal)
        .subscribe((response: GoalModel) => {
          console.log(response)

          transferGoal(
            this.getGoalTypeObjectList().archived,
            this.getGoalTypeObjectList().started,
            goal
          )

          // Start the newly created goal in the started list
          this.activeGoalService.activateGoalCountDown(this.getGoalTypeObjectList().started[this.getGoalTypeObjectList().started.length - 1]);

          // Close the modal
          this.closeViewGoalModal();
        })
    }
  }

  private pauseGoal(goal: GoalModel) {
    if (goal.pausedCount > 0 && (goal.pausedCount % maxPauseCount) === 0) {
      // Open the comment dialog
      const onCommentResponse: Subscription = this.goalCommentService.onCapturedUserComment(pausedState)
        .subscribe((userComment: string | null) => {
          // Unsubscribing from the observer listener to avoid mulitple emits
          onCommentResponse.unsubscribe();

          if (userComment) {
            // If a user decides to archive a goal directly from [in-progress] state, stop the countdown window
            this.activeGoalService.deactivateCurrentActiveGoal();

            goal?.comment?.push({
              comment: userComment,
              commentType: "paused",
              goalId: goal.id
            })

            this.pauseGoalDBUpdate(goal);
          }
          // Close the modal
          this.closeViewGoalModal();
        })
    }
    else {
      this.pauseGoalDBUpdate(goal);
      // Close the modal
      this.closeViewGoalModal();
    }
  }

  private archiveGoal(goal: GoalModel) {
    const userCommentSubscription: Subscription = this.goalCommentService.onCapturedUserComment(archivedState)
      .subscribe((userComment: string | null) => {
        // Unsubscribing from the observer listener to avoid mulitple emits
        userCommentSubscription.unsubscribe();

        if (userComment) {
          // If a user decides to archive a goal directly from [in-progress] state, stop the countdown window
          // this.activeGoalService.deactivateCurrentActiveGoal();

          // Set the user comment for archiving a goal!
          goal?.comment?.push({
            comment: userComment,
            commentType: "archived",
            goalId: goal.id
          })

          // Changing the goal metadata
          goal.pausedCount = 0;
          goal.archiveCount += 1;
          goal.timeRemaining = goal.duration;
          goal?.tasks?.forEach((element: GoalTaskModel) => {
            element.complete = false;
          });

          // Updating goal changes in the database
          this.archiveGoalDBUpdate(goal)
        }
      })
  }

  private resumeGoal(goal: GoalModel) {
    // Guard condition
    if (!this.goalValidationsService.canGoalBeStarted(this.getGoalTypeObjectList().started)) return;

    // Change goal status
    goal.goalStatus = startedState

    // Updating goal changes in the database
    this.goalManagementService.updateGoal(goal)
      .subscribe((response: GoalModel) => {
        console.log(response)

        transferGoal(
          this.getGoalTypeObjectList().paused,
          this.getGoalTypeObjectList().started,
          goal
        )

        // Start the newly created goal in the started list
        this.activeGoalService.activateGoalCountDown(this.getGoalTypeObjectList().started[this.getGoalTypeObjectList().started.length - 1]);

        this.closeViewGoalModal();
      })
  }

  private completeGoal(goal: GoalModel) {
    if (goal?.tasks && goal?.tasks?.length > 0) {
      if (!this.goalValidationsService.canCompleteGoal(
        getCompletedTasks(goal?.tasks),
        goal?.tasks
      )) return;
    }

    // Change goal status
    goal.goalStatus = completedState

    // Updating goal changes in the database
    this.goalManagementService.updateGoal(goal)
      .subscribe((response: GoalModel) => {
        console.log(response)

        transferGoal(
          this.getGoalTypeObjectList().started,
          this.getGoalTypeObjectList().completed,
          goal
        )

        // Stop the countdown timer
        this.activeGoalService.deactivateCurrentActiveGoal();

        // Close the modal!
        this.closeViewGoalModal();

        // Show an encouraging message
        this.toastrMessages.showSuccessMessage("Congradulations", getRandomCustomSuccessMessage(), 20000)
      })
  }

  private restoreGoal(goal: GoalModel) {
    // Change goal status
    goal.goalStatus = backlogState

    // Updating goal changes in the database
    this.goalManagementService.updateGoal(goal)
      .subscribe((response: GoalModel) => {
        console.log(response)

        transferGoal(
          this.getGoalTypeObjectList().archived,
          this.getGoalTypeObjectList().backlog,
          goal
        )

        // Close the modal!
        this.closeViewGoalModal();
      })
  }

  public calculateTaskCompletion(goal: GoalModel): void {
    if (goal?.tasks && goal?.tasks?.length > 0) {
      const completedTasks = goal?.tasks?.filter(task => task.complete === true)
      this.goalProgress = completedTasks.length / goal?.tasks?.length;
    }
    else
      this.goalProgress = 0;
  }

  public getGoalProgress(): number {
    return this.goalProgress;
  }
}
