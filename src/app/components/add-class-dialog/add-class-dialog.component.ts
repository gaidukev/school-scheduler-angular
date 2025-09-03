import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
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
import { ClassesService } from '../../services/classes.service';
import { DatePipe, CommonModule  } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Semester } from '../../services/semesters.service';

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
],
  templateUrl: './add-class-dialog.component.html',
  styleUrl: './add-class-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddClassDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddClassDialogComponent>);
  classesService = inject(ClassesService);

  readonly data = inject(MAT_DIALOG_DATA) as { selectedSemester: Semester };


  formatSemester(): String {
    return `${new Date(this.data.selectedSemester.dateFrom).toLocaleString('y MMM d')} - ${new Date(this.data.selectedSemester.dateTo).toLocaleString('y MMM d')}`
  }




  className = "";
  teacherName = "";
  roomNumber = "";
  startTimeFromMidnight = 0;
  endTimeFromMidnight = 0;

  onNoClick(): void {



    this.classesService.addClass(this.data.selectedSemester.id, this.className, this.teacherName, this.roomNumber, this.startTimeFromMidnight, this.endTimeFromMidnight);
    this.dialogRef.close()
  }


}
