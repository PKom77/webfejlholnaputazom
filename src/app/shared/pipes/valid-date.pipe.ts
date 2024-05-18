import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validDate'
})
export class ValidDatePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
    const day = tomorrow.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

}
