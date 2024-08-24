import { Injectable, signal } from '@angular/core';

export type Class = {
  id: number,
  startDate: string,
  endDate: string,
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
      startDate: "2001-01-01",
      endDate: "2001-04-30",
      name: "English",
      teacher: "Mrs. Harbold",
      room: 401
    },
    {
      id: 1,
      startDate: "2001-01-01",
      endDate: "2001-04-30",
      name: "Math",
      teacher: "Mrs. Olde",
      room: 105
    },
    {
      id: 2,
      startDate: "2001-01-01",
      endDate: "2001-04-30",
      name: "Arts",
      teacher: "Mrs. Palinkas",
      room: 106
    }
  ]);

  classes = this.#classes.asReadonly();


  addClass(startDate: string, endDate: string, name: string, teacher: string, room: number){
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
