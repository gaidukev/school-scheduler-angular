import { Component, inject, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef
} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { ClassesService } from '../../services/classes.service';

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
    DatepickerComponent
],
  templateUrl: './add-class-dialog.component.html',
  styleUrl: './add-class-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddClassDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddClassDialogComponent>);
  classesService = inject(ClassesService);
  newStartDate = signal("1990-01-01");
  newEndDate = signal("1990-04-20");
  className = signal("");

  onNoClick(): void {
    this.classesService.addClass(this.newStartDate(), this.newEndDate(), this.className(), "", 0);
    this.dialogRef.close()
  }


}
