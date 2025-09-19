import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { range, timeInterval } from 'rxjs';
import { Class, ClassesService, Day } from '../../services/classes.service';
import { ActivatedRoute } from '@angular/router';
import { Time } from '../../classes/time';

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
      this.displayClasses = this.classesService.getClassesForSemester(this.selectedSemester);
    });
  }

  days: Day[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  classColors = [
    '#1976D2',
    '#388E3C',
    '#FBC02D', 
    '#D32F2F', 
    '#7B1FA2', 
    '#F57C00', 
    '#0288D1', 
    '#C2185B', 
    '#00796B', 
    '#FFA000',
    '#455A64', 
    '#8BC34A', 
    '#E64A19', 
    '#5D4037',
    '#0097A7',
    '#AFB42B', 
  ];

  amHours = range(6, 6)
  intervalMinutes  = 30;
  minutesInHour = 60;
  morningStartHour = 6;
  eveningEndHour = 21;
  halfDayHours = 12;

  classesService = inject(ClassesService);

  selectedSemester = 0;

  getClassColor(cls: Class): string {
    const classIndex = this.displayClasses.findIndex(c => c.id === cls.id);
    return this.classColors[classIndex % this.classColors.length];
  }

  generateTimeSlots(intervalMinutes: number): Time[] {
    const times: Time[] = [];


    const startMinutes =  this.morningStartHour * this.minutesInHour; // minutes since midnight
    const endMinutes = this.eveningEndHour * this.minutesInHour; // minutes since midnight
    for (let mins = startMinutes; mins <= endMinutes; mins += intervalMinutes) {
      const hours24 = Math.floor(mins / this.minutesInHour);
      const minutes = mins % this.minutesInHour;
      const hours12 = hours24 % this.halfDayHours === 0 ? this.halfDayHours : hours24 % this.halfDayHours;
      const ampm = hours24 < this.halfDayHours ? 'AM' : 'PM';

      const newTime = new Time(String(hours12), String(minutes).padStart(2, "0"), ampm);
      times.push(newTime);
    }

    return times;
  }

  timeSlots = this.generateTimeSlots(this.intervalMinutes);
  displayedColumns = ['time', ...this.days];

  displayClasses: Class[] = this.classesService.getClassesForSemester(this.selectedSemester);

  getClassStartingAt(day: Day, slot: Time): Class | undefined {
    const slotMinutes = slot.timeToMinutes();
    const match =  this.displayClasses.find(c => 
      c.days[day] &&
      c.startTimeFromMidnight <= slotMinutes &&
      c.endTimeFromMidnight > slotMinutes
    )

    return match;
  }


  getRowSpan(cls: Class, timeInterval: number): number {
    if (!cls) return 1;
    return (cls.endTimeFromMidnight - cls.startTimeFromMidnight) / timeInterval;
  }

}
