import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { AppConfig } from '../../../shared/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from '../../../shared/app-config/app-config.service';
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
    archived: new Array<GoalModel>(),
  };

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig
  ) {
    this.goalSubject = new Subject<GoalModel>();
  }

  getGoalSubject(): Subject<GoalModel> {
    return this.goalSubject;
  }

  getGoalTypeObjectList(): goalTypes {
    return this.goalTypeObjectList;
  }

  emitGoal(goal: GoalModel): void {
    this.getGoalSubject().next(goal);
  }

  insertNewGoal(goal: GoalModel): void {
    const user = this.tokenService.getDecodeToken();
    goal.userId = user.id;

    this.http
      .post<GoalModel>(`${this.config.apiUrl}/goal`, goal)
      .subscribe((newGoal) => {
        this.emitGoal(newGoal);
      });
  }

  updateGoal(goal: GoalModel): Observable<GoalModel> {
    return this.http.put<GoalModel>(`${this.config.apiUrl}/goal`, goal);
  }

  onSelectUserGoals(user_id: string): Subject<GoalModel> {
    this.http
      .get<GoalModel[]>(`${this.config.apiUrl}/goal/${user_id}`)
      .subscribe((goals: GoalModel[]) => {
        goals.forEach((goal: GoalModel) => {
          this.emitGoal(goal);
        });
      });

    return this.getGoalSubject();
  }

  getGoalById(id: any): Observable<GoalModel> {
    return this.http.get<GoalModel>(`${this.config.apiUrl}/goal/${id}`);
  }
}
