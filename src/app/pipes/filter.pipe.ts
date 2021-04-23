import { Pipe, PipeTransform } from '@angular/core';
import {IShowcaseItem} from '../model/types';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: IShowcaseItem[], searchValue:string): any {
    if (!searchValue) return value;
    return value.filter((v) => v.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 );
  }

}
