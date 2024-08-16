import { Injectable, signal } from '@angular/core';

export type Class = {
  startDate: string,
  endDate: string,
  name: string
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
      name: "English"
    },
    {
      id: 1,
      startDate: "2001-01-01",
      endDate: "2001-04-30",
      name: "Math"
    },
    {
      id: 2,
      startDate: "2001-01-01",
      endDate: "2001-04-30",
      name: "Arts"
    }
  ]);

  classes = this.#classes.asReadonly();


  addClass(startDate: string, endDate: string, name: string){
    this.#classes.update((oldClasses) => {
      const newId = this.#classes().length;
      return [...oldClasses, 
        {
          id: newId,
          startDate: startDate,
          endDate: endDate,
          name: name
        }]
    })
  }
}
