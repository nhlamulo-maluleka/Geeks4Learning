import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { environment } from 'src/environments/environment';
import { GoalModel, goalTypes } from '../../models/goal-model';

@Injectable({
  providedIn: 'root',
})
export class GoalManagementService {
  private goalSubject!: Subject<GoalModel>;

  private goalTypeObjectList: goalTypes = {
    backlog: new Array<GoalModel>(),
    started: new Array<GoalModel>(),
    paused: new Array<GoalModel>(),
    completed: new Array<GoalModel>(),
    archived: new Array<GoalModel>()
  }

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.goalSubject = new Subject<GoalModel>();
  }

  emitGoal(goal: GoalModel): void {
    this.getGoalSubject().next(goal);
  }

  insertNewGoal(goal: GoalModel): void {
    const user = this.tokenService.getDecodeToken();
    goal.userId = user.id;

    this.http.post<GoalModel>(`${environment.mockServer}/goals`, goal)
      .subscribe(newGoal => {
        this.emitGoal(newGoal)
      })
  }

  updateGoal(goal: GoalModel): Observable<GoalModel> {
    return this.http.put<GoalModel>(`${environment.mockServer}/goals/${goal?.id}`, goal);
  }

  onSelectUserGoals(user_id: string): Subject<GoalModel> {
    this.http.get<GoalModel[]>(`${environment.mockServer}/goals?userId=${user_id}`).subscribe(
      (goals: GoalModel[]) => {
        goals.forEach((goal: GoalModel) => {
          this.emitGoal(goal)
        });
      }
    );

    return this.getGoalSubject();
  }

  getGoalById(id: any): Observable<GoalModel> {
    return this.http.get<GoalModel>(`${environment.mockServer}/goals/${id}`);
  }

  getGoalSubject(): Subject<GoalModel> {
    return this.goalSubject;
  }

  getGoalTypeObjectList(): goalTypes {
    return this.goalTypeObjectList;
  }
}
