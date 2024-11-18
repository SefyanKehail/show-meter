import {Component, Input} from '@angular/core';
import {Inject} from "@angular/core";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrl: './video-modal.component.scss'
})
export class VideoModalComponent {

  sanitizedVideoLink! : SafeResourceUrl;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
    this.sanitizedVideoLink = this.sanitizer.bypassSecurityTrustResourceUrl(data.videoLink);
  }

  sanitize(url: string) {
  }
}
