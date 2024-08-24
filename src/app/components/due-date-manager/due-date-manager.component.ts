import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { DueDatesService, DueDate } from '../../services/due-dates.service';
import { MatButton } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon'; 
import {MatInputModule} from '@angular/material/input'; 
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-due-date-manager',
  standalone: true,
  imports: [MatListModule, MatButton, MatExpansionModule, MatCheckboxModule, 
    MatIconModule, MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './due-date-manager.component.html',
  styleUrl: './due-date-manager.component.scss'
})
export class DueDateManagerComponent {
  dueDatesService = inject(DueDatesService);
  dueDates = this.dueDatesService.dueDates;
  newTask = "";

  addNewTask(id: number){
    this.dueDatesService.addTaskForDueDate(id, this.newTask);
    this.newTask = "";
  }
}
