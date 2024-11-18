import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {Observable, merge, of, tap, map, concat} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private genreList: any[] = [];

  constructor(private http: HttpClient) {
  }

  getGenres() {
    if (this.genreList.length !== 0) {
      return of(this.genreList);
    } else {
      const movieGenres = this.http.get<any>(environment.api.tmdb.endpoints.movie.genres).pipe(
        map(response => response.genres),
        tap(genres => this.genreList.push(...genres))
      )
      const tvGenres = this.http.get<any>(environment.api.tmdb.endpoints.tv.genres).pipe(
        map(response => response.genres),
        tap(genres => this.genreList.push(...genres))
      )

      return concat(movieGenres, tvGenres);
    }
  }
}
