import { Injectable, signal } from '@angular/core';

export type DueDate = {
  id: number,
  date: Date,
  title: string,
  description: string,
  subject: string,
  weight: number,
  tasks: Array<DueDateTask>|[]
}

export type DueDateTask = {
  description: string,
  complete: boolean
}

@Injectable({
  providedIn: 'root'
})
export class DueDatesService {
  #dueDates = signal<DueDate[]>([
    {
      id: 0,
      date: new Date(2001, 2, 30),
      title: "Research writeup",
      description: "Make sure to include citations and format the figures properly",
      subject: "Biology",
      weight: 0.2,
      tasks: [
        {
          description: "Include citations",
          complete: true
        },
        {
          description: "Format figures",
          complete: false
        },
        {
          description: "Proof read",
          complete: false}
      ]
    },
    {
      id: 1,
      date: new Date(2001, 2, 30),
      title: "Math assignment",
      description: "U4: Trigonometry",
      subject: "Math",
      weight: 0.05,
      tasks: [
        {
          description: "Double check using a graphing calculator",
          complete: false
        }
      ]
    },
    {
      id: 2,
      date: new Date(2001, 2, 30),
      title: "Essay personal statement",
      subject: "English",
      description: "",
      weight: 0.1,
      tasks: [
        {
          description: "Check the grammar",
          complete: false
        },
        {
          description: "Proofread",
          complete: false
        }
      ]
    }
  ])
  dueDates = this.#dueDates.asReadonly();

  getNewId(){
    return this.#dueDates().length;
  }

  addDueDate(id:number, date: Date, title: string, subject:string, description: string, weight: number){
    console.log("THIS DUE DATES: ", this.#dueDates(), id)
    this.#dueDates.update((oldDueDates) => {
      if (id < this.#dueDates().length){
        return oldDueDates.map((dueDate) => {
          if (dueDate.id == id) {
            return {
              id: id,
              date: date, 
              title: title,
              description: description,
              weight: weight,
              subject: subject,
              tasks: dueDate.tasks
            }
          } else {
            return dueDate
          }
        })
      } else {
        return [...oldDueDates,
          {
            id: id,
            date: date,
            title: title,
            description: description,
            weight: weight,
            subject: subject,
            tasks: []
          }]
      }

      })

      
  }

  removeDueDate(id: number){
    this.#dueDates.update((oldDueDates) => {
      return oldDueDates.filter((el) => el.id != id)
    })
  }

  addTaskForDueDate(id: number, newTask: string) {
    this.#dueDates.update((oldDueDates) => {
      return oldDueDates.map((dueDate) => {
        if (dueDate.id == id){
          dueDate.tasks = [
            ...dueDate.tasks,
            {
              description: newTask,
              complete: false
            }
          ]
        }
        return dueDate
      })
    })
  }
}
