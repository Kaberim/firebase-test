import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from "./enviroments/enviroment";
import { AngularFireModule } from "@angular/fire/compat";
import { importProvidersFrom } from "@angular/core";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
    // ...
  ]
}).catch((err) => console.error(err));

