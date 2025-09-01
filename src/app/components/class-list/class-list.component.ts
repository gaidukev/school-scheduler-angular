import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ClassesService } from '../../services/classes.service';
import {MatDialog} from '@angular/material/dialog';
import { AddClassDialogComponent } from '../add-class-dialog/add-class-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-class-list',
  standalone: true,
  imports: [MatButtonModule, MatListModule, MatIconModule],
  templateUrl: './class-list.component.html',
  styleUrl: './class-list.component.scss'
})
export class ClassListComponent {
  
  classesService = inject(ClassesService);
  classes = this.classesService.classes;
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(AddClassDialogComponent, {data: {}});

    dialogRef.afterClosed().subscribe(result => {
      console.log("The add class dialog was closed!");
    })
  }

}
