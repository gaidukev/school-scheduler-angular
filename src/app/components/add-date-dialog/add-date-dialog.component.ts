import { Component, inject, signal, model, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose} from '@angular/material/dialog';
import { DueDatesService } from '../../services/due-dates.service';
import { ClassesService } from '../../services/classes.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import {MatButtonModule} from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { AddDueDateDialogData } from '../../../types';

@Component({
  selector: 'app-add-date-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    DatepickerComponent,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule],
  templateUrl: './add-date-dialog.component.html',
  styleUrl: './add-date-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDateDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddDateDialogComponent>);

  readonly data = inject<AddDueDateDialogData>(MAT_DIALOG_DATA);

  dueDatesService = inject(DueDatesService);
  classesService = inject(ClassesService);

  newDate: Date = new Date(this.data.date);
  newTitle = this.data.title;
  newDescription = this.data.description;
  newSubject = this.data.subject;
  newWeight = this.data.weight;
  id = this.data.id;

  classes = this.classesService.classes;

  updateDate(event: Date){
    this.newDate = new Date(event);
  }

  onNoClick(){
    this.dueDatesService.addDueDate(this.id, this.newDate, this.newTitle, this.newSubject, this.newDescription, this.newWeight);
    this.dialogRef.close()
  }


}
