import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
  pure:false
})
export class SortPipe implements PipeTransform {

  transform(value: string[] | number[], direction:'asc' | 'desc'='asc'){ //works on the string and number also
    const sorted = [...value];
    sorted.sort((a,b) => {

      if(direction ==='asc'){
        return a > b ? 1:-1;
      }else{                              //the main logic of pipe
        return a > b ? -1:1;
      }

    });
    return sorted;
  }

}
