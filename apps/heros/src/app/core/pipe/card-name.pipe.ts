import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardName'
})
export class CardNamePipe implements PipeTransform {

  transform(name: string): string {
    if(!name.includes('(')) return name
    return name.split('(')[0];
  }

}
