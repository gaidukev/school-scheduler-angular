import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
  MatDialogModule
} from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SemestersService } from '../../services/semesters.service';

@Component({
  selector: 'app-add-semester-dialog',
  standalone: true,
  imports: [    
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    FormsModule,
    MatButtonModule
  ],
  templateUrl: './add-semester-dialog.component.html',
  styleUrl: './add-semester-dialog.component.scss'
})
export class AddSemesterDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddSemesterDialogComponent>);
  semestersService = inject(SemestersService);

  startDate: Date | undefined = undefined;
  endDate: Date | undefined = undefined;

  onNoClick(): void {
    if (this.startDate != undefined && this.endDate != undefined ) {
      this.semestersService.addSemester(this.startDate, this.endDate);
      this.dialogRef.close()
    }
  }
}
