import { Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { KbComponent } from "./kb/kb.component";

export const routes: Routes =
  [
    {path: 'login', component: LoginComponent},
    {path: '**', component: KbComponent}
  ];
