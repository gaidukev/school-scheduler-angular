import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSemesterDialogComponent } from './add-semester-dialog.component';

describe('AddSemesterDialogComponent', () => {
  let component: AddSemesterDialogComponent;
  let fixture: ComponentFixture<AddSemesterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSemesterDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSemesterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
