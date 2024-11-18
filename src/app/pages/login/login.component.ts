import {Component, OnInit, ViewChild} from '@angular/core';
import {GoogleAuthService} from "../../shared/services/oauth/google-auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  @ViewChild('googleAuthBtn', {static: true})
  googleAuthBtn: any;

  constructor(private googleAuthService: GoogleAuthService) {
  }

  ngOnInit(): void {
    this.googleAuthService.initialize(this.googleAuthBtn.nativeElement);
  };
}
