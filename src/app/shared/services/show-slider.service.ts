import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";



@Injectable({
  providedIn: 'root'
})
export class ShowSliderService {

  constructor(private httpClient: HttpClient) {
  }

  getTrending() {
    return this.httpClient.get<any>(environment.api.tmdb.endpoints.trending);
  }

}
