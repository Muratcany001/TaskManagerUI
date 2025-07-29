import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskVersion } from './task-version';

describe('TaskVersion', () => {
  let component: TaskVersion;
  let fixture: ComponentFixture<TaskVersion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskVersion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskVersion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
