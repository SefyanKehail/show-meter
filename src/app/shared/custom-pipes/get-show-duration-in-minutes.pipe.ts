import { Pipe, PipeTransform } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ShowService} from "../services/show.service";

@Pipe({
  name: 'getShowDurationInMinutes'
})
export class GetShowDurationInMinutesPipe implements PipeTransform {

  constructor(private showService: ShowService) {
  }
  transform(showId: number): number {
    let showDurationInMinutes: number = 0;
    this.showService.getMovieDetails(showId).subscribe(
      (response) => console.log(response)
    )
    return showDurationInMinutes;
  }

}
