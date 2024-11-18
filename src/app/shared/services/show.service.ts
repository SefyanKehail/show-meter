import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";




@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private httpClient: HttpClient) {
  }

  getMovieDetails(movieId: number){
    return this.httpClient.get<any>(environment.api.tmdb.endpoints.movie.details(movieId));
  }

  getTVDetails(tvId: number){
    return this.httpClient.get<any>(environment.api.tmdb.endpoints.tv.details(tvId));
  }}
