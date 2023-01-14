import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultSearch = [];
    for(const search of value){
      if(search.username.toLowerCase().indexOf(args.toLowerCase()) > -1){
        resultSearch.push(search);
      }
    }
    return resultSearch;
  }

}
