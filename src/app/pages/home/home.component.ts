import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {UserProfileDto} from "../../shared/dto/user-profile.dto";
import {ShowSliderService} from "../../shared/services/show-slider.service";
import {InListShowDto} from "../../shared/dto/in-list-show.dto";
import {ShowService} from "../../shared/services/show.service";
import {MovieDto} from "../../shared/dto/movie.dto";
import {MediaTypeEnum} from "../../shared/enums/media-type.enum";
import {TvDto} from "../../shared/dto/tv.dto";
import {TrailerService} from "../../shared/services/trailer.service";
import {VideoDto} from "../../shared/dto/video.dto";
import {ShowCarouselService} from "../../shared/services/show-carousel.service";
import {CarouselTitleEnum} from "../../shared/enums/carousel-title.enum";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  userProfileDto: UserProfileDto | undefined;
  trendingShows!: InListShowDto[];
  genres: any[] = [];
  topRatedMovies!: InListShowDto[];
  topRatedTVSeries!: InListShowDto[];
  recommendedMovies!: InListShowDto[];
  recommendedTVSeries!: InListShowDto[];
  recommended!: InListShowDto[];
  showType!: string;
  upcomingMovies!: InListShowDto[];
  latestMovies!: InListShowDto[];
  latestTVSeries!: InListShowDto[];
  latest!: InListShowDto[];

  protected readonly CarouselTitleEnum = CarouselTitleEnum;


  constructor(
    private authService: AuthService,
    private showSliderService: ShowSliderService,
    private showService: ShowService,
    private trailerService: TrailerService,
    private showCarouselService: ShowCarouselService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.retrieveUserData();

    this.retrieveShowSliderContent();

    this.retrieveTopRatedMoviesCarousel();

    this.retrieveTopRatedTVSeriesCarousel();

    this.retrieveRecommendedMovies();

    this.retrieveRecommendedTVSeries();

    this.retrieveUpcomingMovies();

    this.retrieveLatestMovies();

    this.retrieveLatestTVSeries();
  }


  retrieveUserData() {
    const profileData = JSON.parse(sessionStorage.getItem('loggedInUser')!);

    this.userProfileDto = {
      name: profileData.name,
      email: profileData.email,
      pictureUrl: profileData.picture
    }
  }

  retrieveShowSliderContent() {

    this.activatedRoute.data.subscribe(
        ({trending}) => {
          this.trendingShows = trending.results;
          this.trendingShows = this.trendingShows.filter((inListShowDto: InListShowDto) => !(new Date(inListShowDto.release_date!) > new Date()));
          this.setAdditionalProperties(this.trendingShows);
          // console.log(this.trendingShows);
        }
    )
    // this.showSliderService.getTrending().subscribe(
    //   (response) => {
    //     this.trendingShows = response.results;
    //     this.trendingShows = this.trendingShows.filter((inListShowDto: InListShowDto) => !(new Date(inListShowDto.release_date!) > new Date()));
    //     this.setAdditionalProperties(this.trendingShows);
    //     // console.log(this.trendingShows);
    //   }
    // );

  }

  private setAdditionalProperties(results: InListShowDto[]) {

    results.map((inListShowDto): void => {

      if (inListShowDto.media_type === MediaTypeEnum.Movie) {
        this.setMovieAdditionalProperties(inListShowDto);

      } else {
        if (inListShowDto.media_type === MediaTypeEnum.TV) {
          this.setTVAdditionalProperties(inListShowDto);

        }
      }
    })
  }

  private setMovieAdditionalProperties(inListShowDto: InListShowDto) {
    this.showService.getMovieDetails(inListShowDto.id).subscribe(
      (response: MovieDto) => {
        inListShowDto.runtime = response.runtime;
        inListShowDto.genres = response.genres.map(row => row.name);

        if (!inListShowDto.media_type) {
          inListShowDto.media_type = "movie";
        }


        this.trailerService.getMovieTrailer(response.id).subscribe(
          (trailer: VideoDto) => inListShowDto.trailer_key = trailer.key
        );
      }
    )
  }


  private setTVAdditionalProperties(inListShowDto: InListShowDto) {
    this.showService.getTVDetails(inListShowDto.id).subscribe(
      (response: TvDto) => {
        inListShowDto.season = response.last_episode_to_air ? response.last_episode_to_air.season_number : response.next_episode_to_air.season_number;
        inListShowDto.episode = response.last_episode_to_air ? response.last_episode_to_air.episode_number : response.next_episode_to_air.episode_number;
        inListShowDto.genres = response.genres.map(row => row.name);

        if (!inListShowDto.media_type) {
          inListShowDto.media_type = "tv";
        }

        this.trailerService.getTVTrailer(response.id).subscribe(
          (trailer: VideoDto) => inListShowDto.trailer_key = trailer.key
        );
      }
    )
  }

  private retrieveTopRatedMoviesCarousel() {
    this.showCarouselService.getTopRatedMovies(1).subscribe(
      results => {
        this.topRatedMovies = results;
        this.topRatedMovies.map(
          movie => {
            this.setMovieAdditionalProperties(movie);
          }
        )
      }
    )
  }


  private retrieveTopRatedTVSeriesCarousel() {
    this.showCarouselService.getTopRatedTVSeries(1).subscribe(
      results => {
        this.topRatedTVSeries = results;
        this.topRatedTVSeries.map(
          tvSeries => {
            this.setTVAdditionalProperties(tvSeries);
          }
        )
      }
    )
  }

  private retrieveRecommendedMovies() {
    this.showCarouselService.getRecommendedMovies(1).subscribe(
      results => {
        this.recommendedMovies = results;
        this.recommendedMovies.map(
          movie => {
            this.setMovieAdditionalProperties(movie)
          }
        )
        this.recommended = this.recommendedMovies;
      }
    )
  }

  private retrieveRecommendedTVSeries() {
    this.showCarouselService.getRecommendedTVSeries(1).subscribe(
      results => {
        this.recommendedTVSeries = results;
        this.recommendedTVSeries.map(
          tvSeries => {
            this.setTVAdditionalProperties(tvSeries)
          }
        )
      }
    )
  }

  receiveShowTypeForRecommended(showTypeAndSwiperInstance: any) {
    this.showType = showTypeAndSwiperInstance.showType;

    if (this.showType === MediaTypeEnum.Movie) {
      this.recommended = this.recommendedMovies;
    } else {
      this.recommended = this.recommendedTVSeries;
    }
  }

  receiveShowTypeForLatest(showTypeAndSwiperInstance: any) {
    this.showType = showTypeAndSwiperInstance.showType;

    if (this.showType === MediaTypeEnum.Movie) {
      this.latest = this.latestMovies;
    } else {
      this.latest = this.latestTVSeries;
    }
  }

  retrieveUpcomingMovies(){
    this.showCarouselService.getUpcomingMovies(1).subscribe(
      results => {
        this.upcomingMovies = results;
        console.log(results)
        this.upcomingMovies.map(
          movie => this.setMovieAdditionalProperties(movie)
        )
      }
    )
  }

  retrieveLatestMovies() {
    this.showCarouselService.getLatestMovies(1).subscribe(
      results => {
        this.latestMovies = results;
        this.latestMovies.map(
          movie => this.setMovieAdditionalProperties(movie)
        )
        this.latest = this.latestMovies;
      }
    )
  }

  retrieveLatestTVSeries(){
    this.showCarouselService.getLatestTVSeries(1).subscribe(
      results => {
        this.latestTVSeries = results;
        this.latestTVSeries.map(
          tv => this.setTVAdditionalProperties(tv)
        )
      }
    )
  }



  logOut() {
    this.authService.logOut();
    // Todo implement this in ui
  }
}
