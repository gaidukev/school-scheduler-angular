import {ChangeDetectionStrategy, Component, Output, EventEmitter, Input} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent {
  @Input() initialDate = new Date(2024, 7, 31);
  @Output() dateEvent = new EventEmitter<Date>();

  addDate(date: string){
    this.dateEvent.emit(new Date(date))
  }

}
