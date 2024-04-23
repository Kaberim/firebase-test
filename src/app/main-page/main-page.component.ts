import { AfterViewInit, Component } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { Router } from "@angular/router";
import { MatButton } from "@angular/material/button";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MatButton,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements AfterViewInit{

  ngAfterViewInit() {
    console.log(this.socialAuthServive.authState.subscribe(value => console.log(value)))
  }

  constructor(private router: Router,
              public socialAuthServive: SocialAuthService) {
  }

  logout(): void {
    this.socialAuthServive.signOut().then(() => this.router.navigate(['login']));
  }
}
