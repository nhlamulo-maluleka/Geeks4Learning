import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveHistoryCardComponent } from './leave-history-card.component';

describe('LeaveHistoryCardComponent', () => {
  let component: LeaveHistoryCardComponent;
  let fixture: ComponentFixture<LeaveHistoryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveHistoryCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveHistoryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
