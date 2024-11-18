import {Router} from "@angular/router";

declare var google: any;

import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  constructor(private router: Router) { }

  private decodeToken(token: string): string[] {
    const credentials: string = token.split('.')[1];
    return JSON.parse(atob(credentials));
  }

  private handleResponse(response: any){
    if (response){
      const credentials = this.decodeToken(response.credential);
      sessionStorage.setItem("loggedInUser", JSON.stringify(credentials));
      this.router.navigate(['home'])
    }
    // store in session
    // navigate to home

  }

  initialize(button: HTMLElement){
    google.accounts.id.initialize({
      client_id: environment.oAuth.google.client_id,
      callback: (response: any) => {
        this.handleResponse(response)
      }
    });
    google.accounts.id.prompt();
    google.accounts.id.renderButton(button, environment.oAuth.google.btnStyle)
  }

  signOut(){
    google.accounts.id.disableAutoSelect();
  }
}
