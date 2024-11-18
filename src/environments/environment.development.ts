export const environment = {
  production: false,
  swiper: {
    slider: {
      styles: {
        speed: 1500,
        navigation: true,
        pagination: true,
        autoplay: {
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        multipleActiveThumbs: false,
        rewind: true,
        lazy: true,
        injectStyles: [
          `
          .swiper-button-next,
          .swiper-button-prev {
            color: #F0A500;
            width: 15px;
          }
          .swiper-pagination-bullet{
            background-color: #F0A500;
          }
      `,
        ]
      },
      thumbs: {
        styles: {
          speed: 1500,
          spaceBetween: 2,
          // // centeredSlides: true,
          // centeredSlidesBounds: true,
          freeMode: true,
          lazy: true,
          slidesPerView: 3,
          touchRatio: 1,
          grabCursor: true,
          slideToClickedSlide: true,
          direction: 'vertical',
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
        }
      }
    },
    carousel: {
      styles: {
        observer: true,
        observeParents: true,
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 10,
        navigation: true,
        lazy: false,
        scrollbar: {
          hide: true
        },
        injectStyles: [
          `
          .swiper-button-next,
          .swiper-button-prev {
            color: #F0A500;
            width: 15px;
          }
      `,
        ]
      }
    }
  },
  api: {
    tmdb: {
      baseUrl: 'https://api.themoviedb.org',
      authorization: 'Bearer TMDB_TOKEN',
      endpoints: {
        trending: 'https://api.themoviedb.org/3/trending/all/day?language=en-US',

        movie: {
          details: (movie_id: number): string => `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
          genres: "https://api.themoviedb.org/3/genre/movie/list?language=en",
          topRated: (page: number): string => `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
          videos: (movie_id: number): string => `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
          recommended: (page: number, primary_release_date_gte: string, primary_release_date_lte: string):
            string => `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.gte=${primary_release_date_gte}&primary_release_date.lte=${primary_release_date_lte}&sort_by=popularity.desc&vote_average.gte=5&vote_count.gte=5000`,
          upcoming: (page: number) => {
            return `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}&region=US`;
          },
          latest: (page: number, primary_release_date_gte: string, primary_release_date_lte: string) => {
            return `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&primary_release_date.gte=${primary_release_date_gte}&primary_release_date.lte=${primary_release_date_lte}&sort_by=popularity.desc`
          }
        },

        tv: {
          details: (tv_id: number): string => `https://api.themoviedb.org/3/tv/${tv_id}?language=en-US`,
          genres: "https://api.themoviedb.org/3/genre/tv/list?language=en",
          topRated: (page: number): string => `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`,
          videos: (tv_id: number): string => `https://api.themoviedb.org/3/tv/${tv_id}/videos?language=en-US`,
          recommended: (page: number, first_air_date_gte: string, first_air_date_lte: string):
            string => `https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${first_air_date_gte}&first_air_date.lte=${first_air_date_lte}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&vote_average.gte=5&vote_count.gte=5000`,

          latest: (page: number, firstAirDateGte: string, firstAirDateLte: string) => {
            return `https://api.themoviedb.org/3/discover/tv?first_air_date.gte=${firstAirDateGte}&first_air_date.lte=${firstAirDateLte}&include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc&vote_average.gte=5&vote_count.gte=50`;
          }
        }
      },
      imageBaseUrl: "https://image.tmdb.org/t/p/original",
      youtubeBaseUrl: "https://www.youtube.com/watch?v=",
      youtubeEmbedUrl: (key: string | undefined): string => `https://www.youtube.com/embed/${key}?rel=0`
    }
  },
  oAuth: {
    google: {
      client_id: 'GOOGLE_CLIENT_ID',
      btnStyle: {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        width: "325",
      }
    }
  }
};
