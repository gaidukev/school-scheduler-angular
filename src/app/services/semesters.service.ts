import { Injectable, signal } from '@angular/core';
export type Semester = {
  id: number,
  dateFrom: Date,
  dateTo: Date
}


@Injectable({
  providedIn: 'root'
})

export class SemestersService {

  #semesters = signal([
    {
      id: 0,
      dateFrom: new Date(2001, 0, 1),
      dateTo: new Date(2001, 3, 30)
    },
    {
      id: 1,
      dateFrom: new Date(2001, 0, 1),
      dateTo: new Date(2001, 11, 31)
    }, 
    {
      id: 3,
      dateFrom: new Date(2002, 0, 1),
      dateTo: new Date(2002, 3, 30)
    }
  ])

  semesters = this.#semesters.asReadonly();

  addSemester(dateFrom: Date, dateTo: Date){
    this.#semesters.update((oldSemesters) => {
      const newId = this.#semesters.length;

      return [...oldSemesters, {
        id: newId,
        dateFrom: dateFrom,
        dateTo: dateTo
      }]
    })
  }

}
