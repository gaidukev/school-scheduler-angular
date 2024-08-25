import { Injectable, signal } from '@angular/core';

export type Class = {
  id: number,
  startDate: Date,
  endDate: Date,
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
      startDate: new Date(2001, 0, 1),
      endDate: new Date(2001, 3, 30),
      name: "English",
      teacher: "Mrs. Harbold",
      room: 401
    },
    {
      id: 1,
      startDate: new Date(2001, 0, 1),
      endDate: new Date(2001, 3, 30),
      name: "Math",
      teacher: "Mrs. Olde",
      room: 105
    },
    {
      id: 2,
      startDate: new Date(2001, 0, 1),
      endDate: new Date(2001, 3, 30),
      name: "Biology",
      teacher: "Mrs. Palinkas",
      room: 106
    }
  ]);

  classes = this.#classes.asReadonly();


  addClass(startDate: Date, endDate: Date, name: string, teacher: string, room: number){
    this.#classes.update((oldClasses) => {
      const newId = this.#classes().length;
      return [...oldClasses, 
        {
          id: newId,
          startDate: startDate,
          endDate: endDate,
          name: name,
          teacher: teacher,
          room: room
        }]
    })
  }
}
