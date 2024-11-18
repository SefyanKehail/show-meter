import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './core/components/header/header.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ShowSliderComponent } from './shared/components/show-slider/show-slider.component';
import { GetShowDurationInMinutesPipe } from './shared/custom-pipes/get-show-duration-in-minutes.pipe';
import { VideoModalComponent } from './shared/components/video-modal/video-modal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButton} from "@angular/material/button";
import {MatDialogActions, MatDialogClose} from "@angular/material/dialog";
import { ShowCarouselComponent } from './shared/components/show-carousel/show-carousel.component';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import { ToggleShowTypeComponent } from './shared/components/toggle-show-type/toggle-show-type.component';
import { LimitTitlePipe } from './shared/custom-pipes/limit-title.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import { FooterComponent } from './core/components/footer/footer.component';
import {TmdbRequestsInterceptor} from "./configs/interceptors/tmdb-requests.interceptor";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import { SpinnerComponent } from './shared/components/spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent,
    LoginComponent,
    HeaderComponent,
    ShowSliderComponent,
    GetShowDurationInMinutesPipe,
    VideoModalComponent,
    ShowCarouselComponent,
    ToggleShowTypeComponent,
    LimitTitlePipe,
    FooterComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButton,
    MatDialogClose,
    MatDialogActions,
    MatButtonToggleGroup,
    MatButtonToggle,
    ReactiveFormsModule,
    MatProgressSpinner
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: TmdbRequestsInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
