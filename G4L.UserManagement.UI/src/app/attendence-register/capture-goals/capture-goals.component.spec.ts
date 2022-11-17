import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptureGoalsComponent } from './capture-goals.component';

describe('CaptureGoalsComponent', () => {
  let component: CaptureGoalsComponent;
  let fixture: ComponentFixture<CaptureGoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptureGoalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptureGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
