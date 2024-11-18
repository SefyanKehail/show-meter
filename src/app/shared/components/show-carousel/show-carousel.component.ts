import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {environment} from "../../../../environments/environment.development";
import {InListShowDto} from "../../dto/in-list-show.dto";
import {VideoModalComponent} from "../video-modal/video-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {CarouselTitleEnum} from "../../enums/carousel-title.enum";
import Swiper from "swiper";
import {Observable} from "rxjs";
import {LoadingService} from "../../../core/services/loading.service";


@Component({
  selector: 'app-show-carousel',
  templateUrl: './show-carousel.component.html',
  styleUrl: './show-carousel.component.scss'
})
export class ShowCarouselComponent implements OnInit {
  protected readonly environment = environment;

  @ViewChild('swiperContainer', {static: true}) swiperContainer!: ElementRef;
  @Input() carouselTitle!: string;
  @Input() showList!: InListShowDto[];
  imageBaseUrl: string = environment.api.tmdb.imageBaseUrl;
  protected readonly CarouselTitleEnum = CarouselTitleEnum;
  @Output() showTypeEventEmitter = new EventEmitter();
  swiperInstance!: any;
  loading$ = this.loadingService.loading$;


  constructor(private matDialog: MatDialog,
              private loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.swiperInstance = this.initSwiper();

  }

  private initSwiper() {
    const swiperEl = this.swiperContainer.nativeElement;


    // swiper parameters
    const swiperParams = environment.swiper.carousel.styles;

    // now we need to assign all parameters to Swiper element
    Object.assign(swiperEl!, swiperParams);

    // and now initialize it
    swiperEl!.initialize();
    return swiperEl;
  }

  openVideoModal(videoLink: string) {
    this.matDialog.open(VideoModalComponent, {
      backdropClass: 'bg-style',
      panelClass: 'modal-style',
      data: {
        videoLink: videoLink
      }
    })
  }

  // emit swiper instance as well to apply update()
  receiveShowTypeAndReEmit($event: string) {
    this.showTypeEventEmitter.emit({showType: $event, swiperInstance: this.swiperInstance})
  }

  // to only update the shows that changes and not the whole thing
  trackByShow(show: any) {
    return show.id;
  }
}
