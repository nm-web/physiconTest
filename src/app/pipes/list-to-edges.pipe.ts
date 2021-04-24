import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'listToEdges'
})
export class ListToEdgesPipe implements PipeTransform {

  transform(value: string[] | string): string {
    if (Array.isArray(value) && value.length > 1) {
      return `${value[0]}-${value[value.length - 1]} классы`;
    }
    return value + ' класс';
  }

}
