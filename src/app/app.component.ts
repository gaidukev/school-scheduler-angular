import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { ClassesService } from './services/classes.service';
import { inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AddClassDialogComponent } from './components/add-class-dialog/add-class-dialog.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatListModule, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'school-scheduler';

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
