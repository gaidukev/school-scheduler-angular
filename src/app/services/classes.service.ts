import { Injectable, signal } from '@angular/core';
import { Time } from '../classes/time';

export type Day = "monday"|"tuesday"|"wednesday"|"thursday"|"friday"|"saturday"|"sunday";

export type DayConfig = Record<Day, boolean>;

export const dayMap = {
  monday: "M",
  tuesday: "T",
  wednesday: "W",
  thursday: "R",
  friday: "F",
  saturday: "S",
  sunday: "U"
}

export type Class = {
  id: number,
  semesterId: number,
  name: string,
  teacher: string,
  room: string,
  startTimeFromMidnight: number,
  endTimeFromMidnight: number,
  days: DayConfig
}

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  #classes = signal([
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
      endTimeFromMidnight: 590,
      days: {
        "monday": true,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": false,
        "saturday": false,
        "sunday": false
      }
    },
    {
      id: 2,
      semesterId: 1,
      name: "BIOL 100",
      teacher: "Dr. Thomas Palinkas",
      room: "106",
      startTimeFromMidnight: 480,
      endTimeFromMidnight: 530,
      days: {
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": false,
        "friday": true,
        "saturday": false,
        "sunday": true
      }
    },
    {
      id: 2,
      semesterId: 2,
      name: "BIOL 102",
      teacher: "Dr. Thomas Palinkas",
      room: "106",
      startTimeFromMidnight: 660,
      endTimeFromMidnight: 710,
      days: {
        "monday": false,
        "tuesday": false,
        "wednesday": false,
        "thursday": true,
        "friday": true,
        "saturday": false,
        "sunday": false
      }
    }
  ]);

  classes = this.#classes.asReadonly();

  getClassesForSemester(semesterId: number): Class[] {
    return this.classes().filter(cls => cls.semesterId === semesterId);
  }

  addClass(semesterId: number, name: string, teacher: string, room: string, startTimeFromMidnight: Time|number, endTimeFromMidnight: Time|number, daysConfig: DayConfig): void {
    console.log("Inside of addClass!")
    this.#classes.update((oldClasses) => {
      const newId = this.#classes().length;


      if (startTimeFromMidnight instanceof Time && endTimeFromMidnight instanceof Time) {
        return [...oldClasses, 
          {
            id: newId,
            semesterId: semesterId,
            name: name,
            teacher: teacher,
            room: room,
            startTimeFromMidnight: startTimeFromMidnight.timeToMinutes(),
            endTimeFromMidnight: endTimeFromMidnight.timeToMinutes(),
            days: daysConfig
          }
        ]
      } else if (typeof startTimeFromMidnight === 'number' && typeof endTimeFromMidnight === 'number') {
        return [
          ...oldClasses, 
          {
            id: newId,
            semesterId: semesterId,
            name: name,
            teacher: teacher,
            room: room, 
            startTimeFromMidnight: startTimeFromMidnight,
            endTimeFromMidnight: endTimeFromMidnight,
            days: daysConfig
          }
        ]
      } else {
        return []
      }
    })
  }



}
