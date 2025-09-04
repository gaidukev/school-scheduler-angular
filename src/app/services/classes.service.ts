import { Injectable, signal } from '@angular/core';

export type Class = {
  id: number,
  semesterId: number,
  name: string,
  teacher: string,
  room: string,
  startTimeFromMidnight: number,
  endTimeFromMidnight: number
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
      endTimeFromMidnight: 770
    },
    {
      id: 1,
      semesterId: 0,
      name: "MATH 203",
      teacher: "Dr. Katherine Olde",
      room: "105",
      startTimeFromMidnight: 540,
      endTimeFromMidnight: 590
    },
    {
      id: 2,
      semesterId: 1,
      name: "BIOL 100",
      teacher: "Dr. Thomas Palinkas",
      room: "106",
      startTimeFromMidnight: 480,
      endTimeFromMidnight: 530
    },
    {
      id: 2,
      semesterId: 2,
      name: "BIOL 102",
      teacher: "Dr. Thomas Palinkas",
      room: "106",
      startTimeFromMidnight: 660,
      endTimeFromMidnight: 710
    }
  ]);

  classes = this.#classes.asReadonly();



  addClass(semesterId: number, name: string, teacher: string, room: string, startTimeFromMidnight: number, endTimeFromMidnight: number){
    this.#classes.update((oldClasses) => {
      const newId = this.#classes().length;
      return [...oldClasses, 
        {
          id: newId,
          semesterId: semesterId,
          name: name,
          teacher: teacher,
          room: room,
          startTimeFromMidnight: startTimeFromMidnight,
          endTimeFromMidnight: endTimeFromMidnight
        }]
    })
  }
}
