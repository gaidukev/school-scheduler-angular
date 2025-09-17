import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { range, timeInterval } from 'rxjs';
import { Class, ClassesService, Day } from '../../services/classes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss'
})
export class TimetableComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const semesterId = Number(params.get('semesterId'));
      this.selectedSemester = semesterId;
      this.sampleClasses = this.classesService.getClassesForSemester(this.selectedSemester);
    });
  }

  days: Day[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  amHours = range(6, 6)
  intervalMinutes  = 30;
  minutesInHour = 60;
  morningStartHour = 6;
  eveningEndHour = 21;
  halfDayHours = 12;

  classesService = inject(ClassesService);

  selectedSemester = 0;

  generateTimeSlots(intervalMinutes: number): string[] {
    const times: string[] = [];
    const startMinutes =  this.morningStartHour * this.minutesInHour; // minutes since midnight
    const endMinutes = this.eveningEndHour * this.minutesInHour; // minutes since midnight
    for (let mins = startMinutes; mins <= endMinutes; mins += intervalMinutes) {
      const hours24 = Math.floor(mins / this.minutesInHour);
      const minutes = mins % this.minutesInHour;
      const hours12 = hours24 % this.halfDayHours === 0 ? this.halfDayHours : hours24 % this.halfDayHours;
      const ampm = hours24 < this.halfDayHours ? 'AM' : 'PM';
      times.push(`${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`)
    }

    return times;
  }

  timeSlots = this.generateTimeSlots(this.intervalMinutes);
  displayedColumns = ['time', ...this.days];

  sampleClasses: Class[] = this.classesService.getClassesForSemester(this.selectedSemester);

  getClassStartingAt(day: Day, slot: string): Class | undefined {
    const slotMinutes = this.timeToMinutes(slot);
    const match =  this.sampleClasses.find(c => 
      c.days[day] &&
      c.startTimeFromMidnight <= slotMinutes &&
      c.endTimeFromMidnight > slotMinutes
    )

    console.log("matching class, end Time: ", match?.endTimeFromMidnight);

    return match;
  }
  

  timeToMinutes(label: string): number {
    const [time, period] = label.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  getRowSpan(cls: Class, timeInterval: number): number {
    if (!cls) return 1;
    return (cls.endTimeFromMidnight - cls.startTimeFromMidnight) / timeInterval;
  }

}
