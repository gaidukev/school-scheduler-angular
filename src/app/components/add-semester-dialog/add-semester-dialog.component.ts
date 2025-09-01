import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef
} from '@angular/material/dialog';
import { SemestersService } from '../../services/semesters.service';

@Component({
  selector: 'app-add-semester-dialog',
  standalone: true,
  imports: [    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
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
