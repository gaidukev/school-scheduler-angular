import { Injectable, signal } from '@angular/core';

export type Class = {
  id: number,
  semesterId: number,
  name: string,
  teacher: string,
  room: number
}

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  #classes = signal([
    {
      id: 0,
      semesterId: 0,
      name: "English",
      teacher: "Mrs. Harbold",
      room: 401
    },
    {
      id: 1,
      semesterId: 0,
      name: "Math",
      teacher: "Mrs. Olde",
      room: 105
    },
    {
      id: 2,
      semesterId: 0,
      name: "Biology",
      teacher: "Mrs. Palinkas",
      room: 106
    }
  ]);

  classes = this.#classes.asReadonly();


  addClass(semesterId: number, name: string, teacher: string, room: number){
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
