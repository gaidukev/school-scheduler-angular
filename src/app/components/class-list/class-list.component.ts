import { Component, inject, signal, computed } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ClassesService, Class } from '../../services/classes.service';
import { SemestersService, Semester } from '../../services/semesters.service';
import {MatDialog} from '@angular/material/dialog';
import { AddClassDialogComponent } from '../add-class-dialog/add-class-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DatePipe, CommonModule  } from '@angular/common';
import { AddSemesterDialogComponent } from '../add-semester-dialog/add-semester-dialog.component';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [MatButtonModule, MatListModule, MatIconModule, MatOption, MatSelect, MatFormFieldModule, MatInputModule, FormsModule, DatePipe, CommonModule],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.scss'
})
export class ClassListComponent {
  
  classesService = inject(ClassesService);
  semestersService = inject(SemestersService);
  classes = this.classesService.classes;
  semesterOptions = this.semestersService.semesters;

  selectedSemester = signal<number>(0);

  filteredClasses = computed(() => {
    return this.classes().filter((el) => el.semesterId == this.selectedSemester())
  })

  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(AddClassDialogComponent, {data: {}, "minWidth": "50%" });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The add class dialog was closed!");
    })
  }

  onAddSemester(): void {

    const dialogRef = this.dialog.open(AddSemesterDialogComponent, {data: {}, "minWidth": "50%" });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The add semester dialog has been closed!")
    })
  }

}
