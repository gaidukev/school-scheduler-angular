import { Routes } from '@angular/router';
import { ClassListComponent } from './components/class-list/class-list.component';
import { DueDateManagerComponent } from './components/due-date-manager/due-date-manager.component';
import { TimetableComponent } from './components/timetable/timetable.component';

export const routes: Routes = [
    {path: 'classes-list', component: ClassListComponent},
    {path: 'due-dates', component: DueDateManagerComponent},
    {path: 'timetable', component: TimetableComponent}
];
