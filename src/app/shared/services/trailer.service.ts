import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {filter, map} from "rxjs";
import {VideoDto} from "../dto/video.dto";
import {VideoTypeEnum} from "../enums/video-type.enum";
import {VideoModalComponent} from "../components/video-modal/video-modal.component";

@Injectable({
  providedIn: 'root'
})
export class TrailerService {

  constructor(private httpClient: HttpClient) {
  }

  getMovieTrailer(movieId: number) {
    return this.httpClient.get(environment.api.tmdb.endpoints.movie.videos(movieId)).pipe(
      map((response: any) => {
        const trailers = response.results.filter((result: VideoDto) => result.type === VideoTypeEnum.Trailer);
        return trailers.reduce((d1: VideoDto, d2: VideoDto) => new Date(d1.published_at) > new Date(d2.published_at) ? d1 : d2)
      }),
    )
  }

  getTVTrailer(tvId: number){
    return this.httpClient.get(environment.api.tmdb.endpoints.tv.videos(tvId)).pipe(
      map((response: any) => {
        const trailers = response.results.filter((result: VideoDto) => result.type === VideoTypeEnum.Trailer);
        // Todo debug none working trailer api calls
        return trailers.reduce((d1: VideoDto, d2: VideoDto) => new Date(d1.published_at) > new Date(d2.published_at) ? d1 : d2)
      }),
    )
  }

}
