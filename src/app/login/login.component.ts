import {Component, NgZone, OnInit} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";
import {AuthService, User} from "../services/auth.service";

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
        NgIf,
        GoogleSigninButtonModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    ngOnInit() {
        //Wywołanie logowania Google
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
            {theme: "outline", size: "large", width: "100%"}
        );
        // @ts-ignore
        google.accounts.id.prompt((notification: PromptMomentNotification) => {
        });
    }

    constructor(
        private router: Router,
        private auth: AuthService,
        private zone: NgZone) {
    }

    decodeJWTToken(token: any) {
        return JSON.parse(atob(token.split(".")[1]))
    }

    async handleCredentialResponse(response: any) {
        const responsePayload = this.decodeJWTToken(response.credential)
        //zapis obecnego użytkownika
        sessionStorage.setItem('loggedinUser', JSON.stringify(responsePayload))

        this.auth.login(responsePayload as User)
        //Obejście przez ngZone bug'a, gdzie router.navigate nie włącza ngOnInit ładowanego komponentu
        this.zone.run(() => {
            this.router.navigateByUrl('');
        });
    }
}
