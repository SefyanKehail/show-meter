import {Injectable} from '@angular/core';
import {GoogleAuthService} from "./oauth/google-auth.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // right now it's tightly coupled to google
  constructor(
    private googleAuthService: GoogleAuthService,
    private router: Router
  ) {
  }

  logOut() {
    sessionStorage.removeItem("loggedInUser");
    this.googleAuthService.signOut();
    this.router.navigate(['/']);
  }
}
