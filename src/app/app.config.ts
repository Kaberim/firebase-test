import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "../enviroments/enviroment";
import { GoogleLoginProvider, SocialAuthService, SocialAuthServiceConfig } from "angularx-social-login";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '329374168238-fdu56g6dnhqccbmi8r834ukt17j1kaop.apps.googleusercontent.com'
            )
          }
        ],
        onError: (error: any) => {
          console.error(error);
        }
      } as SocialAuthServiceConfig
    }
  ]
};
