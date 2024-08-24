import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueDateManagerComponent } from './due-date-manager.component';

describe('DueDateManagerComponent', () => {
  let component: DueDateManagerComponent;
  let fixture: ComponentFixture<DueDateManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DueDateManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DueDateManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
