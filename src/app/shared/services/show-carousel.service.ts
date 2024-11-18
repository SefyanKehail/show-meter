import {Inject, Injectable, LOCALE_ID, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment.development";
import {map} from "rxjs";
import {formatDate} from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class ShowCarouselService {

  constructor(private httpClient: HttpClient, @Inject(LOCALE_ID) private locale: string) {
  }


  getTopRatedMovies(page: number) {
    return this.httpClient.get<any>(environment.api.tmdb.endpoints.movie.topRated(page)).pipe(
      map((response) => response.results)
    );
  }

  getTopRatedTVSeries(page: number) {
    return this.httpClient.get<any>(environment.api.tmdb.endpoints.tv.topRated(page)).pipe(
      map((response) => response.results)
    );
  }

  getTotalPages(endpoint: any, page: number = 1) {
    return this.httpClient.get<any>(endpoint(page)).pipe(
      map((response) => response.total_pages)
    );
  }

  getTotalResults(endpoint: any, page: number = 1) {
    return this.httpClient.get<any>(endpoint(page)).pipe(
      map((response) => response.total_results)
    );
  }

  getRecommendedMovies(page: number) {
    const primaryReleaseDateGte = '2016-01-01';
    const primaryReleaseDateLte = formatDate(Date.now(), 'yyyy-MM-dd', this.locale);
    return this.httpClient.get<any>(environment.api.tmdb.endpoints.movie.recommended(page, primaryReleaseDateGte, primaryReleaseDateLte)).pipe(
      map((response) => response.results)
    );
  }

  getRecommendedTVSeries(page: number) {
    const firstAirDateGte = '2014-01-01';
    const firstAirDateLte = formatDate(Date.now(), 'yyyy-MM-dd', this.locale);
    return this.httpClient.get<any>(environment.api.tmdb.endpoints.tv.recommended(page, firstAirDateGte, firstAirDateLte)).pipe(
      map((response) => response.results)
    );
  }

  getUpcomingMovies(page: number) {
    return this.httpClient.get<any>(environment.api.tmdb.endpoints.movie.upcoming(page)).pipe(
      map((response) => response.results)
    );
  }

  getLatestMovies(page: number) {
    const primaryReleaseDateLte = formatDate(Date.now(), 'yyyy-MM-dd', this.locale);
    const currentDate = new Date();
    const primaryReleaseDateGte = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDay()), 'yyyy-MM-dd', this.locale);
    console.log(primaryReleaseDateLte, primaryReleaseDateGte);

    return this.httpClient.get<any>(environment.api.tmdb.endpoints.movie.latest(page, primaryReleaseDateGte, primaryReleaseDateLte)).pipe(
      map((response) => response.results)
    );
  }


  getLatestTVSeries(page: number) {
    const firstAirDateLte = formatDate(Date.now(), 'yyyy-MM-dd', this.locale);
    const currentDate = new Date();
    const firstAirDateGte = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDay()), 'yyyy-MM-dd', this.locale);
    console.log(firstAirDateLte, firstAirDateGte);

    return this.httpClient.get<any>(environment.api.tmdb.endpoints.tv.latest(page, firstAirDateGte, firstAirDateLte)).pipe(
      map((response) => response.results)
    );
  }
}
