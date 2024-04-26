import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { KbComponent } from "./kb/kb.component";
import { HomePageComponent } from "./home-page/home-page.component";

export const routes: Routes =
  [
    {path: 'login', component: LoginComponent},
    {path: '**', component: HomePageComponent}
  ];
