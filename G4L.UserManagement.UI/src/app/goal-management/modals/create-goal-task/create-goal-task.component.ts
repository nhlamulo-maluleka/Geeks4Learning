import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-create-goal-task',
  templateUrl: './create-goal-task.component.html',
  styleUrls: ['./create-goal-task.component.css']
})
export class CreateGoalTaskComponent implements OnInit {
  taskFormGroup: FormGroup = new FormGroup({
    Task: new FormControl(null, [Validators.required])
  })

  constructor(private taskModalRef: MdbModalRef<CreateGoalTaskComponent>) { }

  ngOnInit(): void {}

  getFormControl(name: string): AbstractControl {
    return this.taskFormGroup.controls[name];
  }

  isFormControlInvalid(name: string): boolean {
    return this.getFormControl(name).invalid;
  }

  isFormControlTouched(name: string): boolean {
    return this.getFormControl(name).touched;
  }

  addNewTask(): void {
    this.taskFormGroup.markAllAsTouched();
    if(this.taskFormGroup.invalid) return;

    this.closeModal(this.getFormControl('Task').value);
  }

  closeModal(task?: string): void {
    this.taskModalRef.close(task)
  }
}
