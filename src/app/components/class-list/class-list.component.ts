import { Component, inject, signal, computed, Signal } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ClassesService, Class, DayConfig, dayMap } from '../../services/classes.service';
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
import { TimePipe } from '../../pipes/time.pipe';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [MatButtonModule, MatListModule, MatIconModule, MatOption, MatSelect, MatFormFieldModule, MatInputModule, FormsModule, DatePipe, CommonModule, TimePipe, RouterLink],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.scss'
})
export class ClassListComponent {

  addSemesterValue = 'add';
  
  classesService = inject(ClassesService);
  semestersService = inject(SemestersService);
  classes = this.classesService.classes;
  semesterOptions = this.semestersService.semesters;

  selectedSemesterId = signal<number>(0);

  formatDays(days: DayConfig): string {
    let initialString = "";
    const yes = 
      (Object.keys(days) as (keyof DayConfig)[])
      .filter((day) => days[day])
      .map((day) => dayMap[day])
      .join("")

    return yes;
  }

  filteredClasses = computed(() => {
    return this.classesService.getClassesForSemester(this.selectedSemesterId());
  })

  readonly dialog = inject(MatDialog);

  onAddClass(): void {
    const dialogRef = this.dialog.open(AddClassDialogComponent, {data: {
      "selectedSemester": this.semesterOptions().filter((el) => el.id == this.selectedSemesterId())[0]

    }, "minWidth": "50%" });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The add class dialog was closed!");
    })
  }

  onAddSemester(): void {
    if (String(this.selectedSemesterId()) != this.addSemesterValue) {
      console.log("selected semester id: " + this.selectedSemesterId());

      const dialogRef = this.dialog.open(AddSemesterDialogComponent, {data: {}, "minWidth": "40%" });

      dialogRef.afterClosed().subscribe(result => {
        console.log("The add semester dialog has been closed!")
      })
    }

  }

}
