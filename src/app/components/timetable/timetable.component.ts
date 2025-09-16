import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { range, timeInterval } from 'rxjs';
import { Class, Day } from '../../services/classes.service';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss'
})
export class TimetableComponent {
  generateTimeSlots(intervalMinutes: number): string[] {
    const times: string[] = [];
    const startMinutes = 6 * 60; // 6:00 <- minutes since midnight
    const endMinutes = 21 * 60 // 21:00 <- minutes since midnight
    for (let mins = startMinutes; mins <= endMinutes; mins += intervalMinutes) {
      const hours24 = Math.floor(mins / 60);
      const minutes = mins % 60;
      const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
      const ampm = hours24 < 12 ? 'AM' : 'PM';
      times.push(`${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`)
    }

    return times;
  }

  days: Day[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  amHours = range(6, 6)
  intervalMinutes  = 30;
  timeSlots = this.generateTimeSlots(this.intervalMinutes);

  displayedColumns = ['time', ...this.days];

  sampleClasses: Class[] = [
    {
      id: 0,
      semesterId: 0,
      name: "ENGL 101",
      teacher: "Dr. Sarah Harbold",
      room: "401",
      startTimeFromMidnight: 720,
      endTimeFromMidnight: 770,
      days: {
        "monday": true,
        "tuesday": false,
        "wednesday": true,
        "thursday": true,
        "friday": false,
        "saturday": false,
        "sunday": false
      }
    },
    {
      id: 1,
      semesterId: 0,
      name: "MATH 203",
      teacher: "Dr. Katherine Olde",
      room: "105",
      startTimeFromMidnight: 540,
      endTimeFromMidnight: 690,
      days: {
        "monday": true,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false,
        "saturday": false,
        "sunday": false
      }
    }
  ];

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
    console.log("timeToMinutes: ", hours * 60 + minutes, "label: ", label);
    return hours * 60 + minutes;
  }

  getRowSpan(cls: Class, timeInterval: number): number {
    if (!cls) return 1;
    console.log("endTime: ", cls.endTimeFromMidnight, "start time: ", cls.startTimeFromMidnight, "duration: ", (cls.endTimeFromMidnight - cls.startTimeFromMidnight) / timeInterval);
    return (cls.endTimeFromMidnight - cls.startTimeFromMidnight) / timeInterval;
  }

}
