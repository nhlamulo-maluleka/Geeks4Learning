import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerTableComponent } from './learner-table.component';

describe('LearnerTableComponent', () => {
  let component: LearnerTableComponent;
  let fixture: ComponentFixture<LearnerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
