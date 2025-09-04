import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
  standalone: true
})
export class TimePipe implements PipeTransform {

  transform(value: number): string {
    if (typeof value !== 'number') return '';

    let hours = Math.floor(value / 60);
    let minutes = value % 60;

    const suffix = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 

    return `${hours}:${minutes.toString().padStart(2, '0')} ${suffix}`;
  }

}
