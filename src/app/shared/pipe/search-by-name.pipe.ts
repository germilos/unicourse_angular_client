import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchByName'
})
export class SearchByNamePipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();

    return items.filter(it => {
      if (it && it.nameSurname) {
        return it.nameSurname.toLowerCase().includes(searchText);
      }
    });
  }
}
