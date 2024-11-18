import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTitle'
})
export class LimitTitlePipe implements PipeTransform {

  transform(title: string | undefined): string | undefined {
    return title!.length > 21 ? title!.slice(0,21) + '...' : title ;
  }

}
