import { Component, inject, Inject, ChangeDetectionStrategy, signal, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormArray, FormBuilder, FormsModule, FormGroup, NgForm, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { ClassesService, DayConfig } from '../../services/classes.service';
import { DatePipe, CommonModule  } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Semester } from '../../services/semesters.service';
import { Time } from '../../classes/time';
import { MatCheckbox } from "@angular/material/checkbox";

@Component({
  selector: 'app-add-class-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    DatepickerComponent,
    MatOption,
    MatSelect,
    DatePipe,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckbox
],
  templateUrl: './add-class-dialog.component.html',
  styleUrl: './add-class-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddClassDialogComponent {
  classForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: { selectedSemester: Semester }
  ) {
    this.classForm = this.fb.group({
      className: ['', [Validators.required]],
      teacherName: ['', [Validators.required]],
      roomNumber: ['', []],
      startTime: this.fb.group({
        hours: ['', [Validators.required, this.hourValidator]],
        minutes: ['', [Validators.required, this.minuteValidator]],
        dayPeriod: ['AM', Validators.required]
      }),
      endTime: this.fb.group({
        hours: ['', [Validators.required, this.hourValidator]],
        minutes: ['', [Validators.required, this.minuteValidator]],
        dayPeriod: ['AM', Validators.required]
      }),
      days: this.fb.group({
        monday: [false],
        tuesday: [false],
        wednesday: [false],
        thursday: [false],
        friday: [false],
        saturday: [false],
        sunday: [false]
      })
  }, { validators: [this.endAfterStartValidator] });
  }

  hourValidator(control: AbstractControl): ValidationErrors | null {
    return Time.isValidHours(control.value) ? null : { invalidHour: true };
  }

  minuteValidator(control: AbstractControl): ValidationErrors | null {
    return Time.isValidMinutes(control.value) ? null : { invalidMinute: true };
  }

  extractTimes = (group: AbstractControl): [Time, Time] | null => {
    const start = group.get('startTime')?.value;
    const end = group.get('endTime')?.value;

    if (!start || !end) return null;

    const startTime = new Time(start.hours, start.minutes, start.dayPeriod);
    const endTime = new Time(end.hours, end.minutes, end.dayPeriod);


    console.log("startTime: ", startTime.timeToMinutes(), "endTime: ", endTime.timeToMinutes())
    return [startTime, endTime];

  }

  endAfterStartValidator = (group: AbstractControl): ValidationErrors | null => {

    const errorReturn = {endBeforeStart: true};


    const result = this.extractTimes(group);
    if (result){
      const [startTime, endTime] = result;
      return Time.isLessThan(startTime, endTime) ? null : errorReturn;
    } else {
      return errorReturn;
    }
    
  }

  onSubmit() {
    const className = this.classForm.get('className')?.value;
    const teacherName = this.classForm.get('teacherName')?.value;
    const roomNumber = this.classForm.get('roomNumber')?.value;
    const timesResult = this.extractTimes(this.classForm);
    const days = this.classForm.get('days')?.value;

    const daysConfig: DayConfig = {
      monday: days.monday,
      tuesday: days.tuesday,
      wednesday: days.wednesday,
      thursday: days.thursday,
      friday: days.friday,
      saturday: days.saturday,
      sunday: days.sunday
    }

    console.log("Values: ", this.classForm.valid, timesResult, roomNumber, teacherName, className)

    if (this.classForm.valid && timesResult && roomNumber && teacherName && className) {

      console.log("Inside of if statement!")
      const [startTime, endTime] = timesResult;
      this.classesService.addClass(this.data.selectedSemester.id, className, teacherName, roomNumber, startTime, endTime, daysConfig);
      this.dialogRef.close(this.classForm.value);

    } else {
      this.classForm.markAllAsTouched();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  classesService = inject(ClassesService);


  formatSemester(): String {
    return `${new Date(this.data.selectedSemester.dateFrom).toLocaleString('y MMM d')} - ${new Date(this.data.selectedSemester.dateTo).toLocaleString('y MMM d')}`
  }




  className = "";
  teacherName = "";
  roomNumber = "";

  startTimeFromMidnight: Time = new Time("0", "0", 'AM');
  endTimeFromMidnight: Time = new Time("0", "0", 'AM');


}
