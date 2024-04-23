import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from "@angular/material/card";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatButton } from "@angular/material/button";
import { Router } from "@angular/router";
import { SocialAuthService } from "angularx-social-login";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatCardActions,
    MatInput,
    MatButton,
    MatLabel,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  ngOnInit() {
    //@ts-ignore
    google.accounts.id.initialize({
      client_id: "329374168238-fdu56g6dnhqccbmi8r834ukt17j1kaop.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,

    });
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById("google-button"),
      { theme: "outline", size: "large", width: "100%" }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {});

    this.socialAuthService.authState.subscribe((user) => {
      console.log(user)
      //perform further logics
    });
  }

  constructor(private router: Router,
              public socialAuthService: SocialAuthService) {
  }
  logout(): void {
    this.socialAuthService.signOut().then(() => this.router.navigate(['login']));
  }

  decodeJWTToken(token:any){
    return JSON.parse(atob(token.split(".")[1]))
  }
  async handleCredentialResponse(response: any) {
    const responsePayload = this.decodeJWTToken(response.credential)
    console.log(responsePayload)
    sessionStorage.setItem('loggedinUser',JSON.stringify(responsePayload))
    // window.location('/your-desired-place')
  }
}
