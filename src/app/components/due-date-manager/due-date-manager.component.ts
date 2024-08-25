import { Component, inject, model } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { DueDatesService, DueDate } from '../../services/due-dates.service';
import { MatButton } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input'; 
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddDateDialogComponent } from '../add-date-dialog/add-date-dialog.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-due-date-manager',
  standalone: true,
  imports: [MatListModule, MatButton, MatExpansionModule, MatCheckboxModule, 
    MatIconModule, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './due-date-manager.component.html',
  styleUrl: './due-date-manager.component.scss'
})
export class DueDateManagerComponent {

  readonly dialog = inject(MatDialog);

  dueDatesService = inject(DueDatesService);
  dueDates = this.dueDatesService.dueDates;
  newTask = "";

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDateDialogComponent, {data: {
      date: new Date(2001, 0, 1),
      title: "",
      description: "",
      subject: "",
      weight: 0,
      id: this.dueDatesService.getNewId()
    }});

    dialogRef.afterClosed().subscribe(result => {
      console.log("The add class dialog was closed!");
    })
  }

  openDialogEdit(dueDate: DueDate): void {

    const dialogRef = this.dialog.open(AddDateDialogComponent, {data: {
      date: dueDate.date, 
      title: dueDate.title,
      description: dueDate.description,
      subject: dueDate.subject,
      weight: dueDate.weight,
      id: dueDate.id
    }});

  }

  addNewTask(id: number){
    this.dueDatesService.addTaskForDueDate(id, this.newTask);
    this.newTask = "";
  }
}
