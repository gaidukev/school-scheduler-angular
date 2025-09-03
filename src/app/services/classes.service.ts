import { Injectable, signal } from '@angular/core';

export type Class = {
  id: number,
  semesterId: number,
  name: string,
  teacher: string,
  room: string
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
      room: "401"
    },
    {
      id: 1,
      semesterId: 0,
      name: "MATH 203",
      teacher: "Dr. Katherine Olde",
      room: "105"
    },
    {
      id: 2,
      semesterId: 1,
      name: "BIOL 100",
      teacher: "Dr. Thomas Palinkas",
      room: "106"
    },
    {
      id: 2,
      semesterId: 2,
      name: "BIOL 102",
      teacher: "Dr. Thomas Palinkas",
      room: "106"
    }
  ]);

  classes = this.#classes.asReadonly();


  addClass(semesterId: number, name: string, teacher: string, room: string){
    this.#classes.update((oldClasses) => {
      const newId = this.#classes().length;
      return [...oldClasses, 
        {
          id: newId,
          semesterId: semesterId,
          name: name,
          teacher: teacher,
          room: room
        }]
    })
  }
}
