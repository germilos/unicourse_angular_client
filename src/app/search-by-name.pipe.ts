import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {
  transform(values: any[], field: string, filter: string): any[] {
    if (!values || !values.length) return [];
    if (!filter) return values;

    // filter = filter.toUpperCase();

    return values.filter(value =>
      value[field].toLowerCase().includes(filter.toLowerCase())
    );
  }
}
