import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {InListShowDto} from "../../dto/in-list-show.dto";
import {MatDialog} from "@angular/material/dialog"
import {VideoModalComponent} from "../video-modal/video-modal.component";

@Component({
  selector: 'app-show-slider',
  templateUrl: './show-slider.component.html',
  styleUrl: './show-slider.component.scss',
})
export class ShowSliderComponent implements OnInit {

  @ViewChild('swiperContainer', {static: true}) swiperContainer!: ElementRef;

  @ViewChild('swiperThumbsContainer', {static: true}) swiperThumbsContainer!: ElementRef;

  @Input() trendingShows!: InListShowDto[];

  imageBaseUrl: string = environment.api.tmdb.imageBaseUrl;

  protected readonly environment = environment;

  constructor(private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initSwiper();

    this.initSwiperThumbs();
  }

  private initSwiper() {
    const swiperEl = this.swiperContainer.nativeElement;

    // swiper parameters
    const swiperParams = environment.swiper.slider.styles;

    // now we need to assign all parameters to Swiper element
    Object.assign(swiperEl!, swiperParams);

    // and now initialize it
    swiperEl!.initialize();
  }


  private initSwiperThumbs() {
    const swiperThumbsEl = this.swiperThumbsContainer.nativeElement;

    const swiperThumbsParams = environment.swiper.slider.thumbs.styles;

    Object.assign(swiperThumbsEl!, swiperThumbsParams);

    swiperThumbsEl.initialize();
  }


  openVideoModal(videoLink: string){
    this.matDialog.open(VideoModalComponent, {
      backdropClass: 'bg-style',
      panelClass: 'modal-style',
      data: {
        videoLink: videoLink
      }
    })
  }

  // to only update the shows that changes and not the whole thing
  trackByShow(show: any) {
    return show.id;
  }

}
