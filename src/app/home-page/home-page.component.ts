import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { filter, interval, map, Observable, Subscription, switchMap, tap } from "rxjs";
import { Character } from "../data/character";
import { MatDialog } from "@angular/material/dialog";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FirebaseService } from "../services/firebase.service";
import { AsyncPipe, NgIf } from "@angular/common";
import { CharacterCardComponent } from "../character-card/character-card.component";
import { LocalStorageService } from "../services/cache.service";
import { RelicSet } from "../data/relic-set";
import { MatButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { userData } from "../data/user-data";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatToolbar,
    AsyncPipe,
    CharacterCardComponent,
    NgIf,
    MatButton,
    MatCheckbox,
    FormsModule,
    RouterLink
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {
  checked = false;
  characters = this.fbStore.getCollection('characters').valueChanges({idField: 'id'}) as Observable<Character[]>
  activeCharacters = this.characters.pipe(
    map(value => value.filter(character => this.active.includes(character.id)))
  );
  active: string[] = this.cache.getItem('active') || []

  kits: { characterId: string, relics: RelicSet }[] = this.cache.getItem('kits') || [];
  selected?: Character;

  intervalSub?: Subscription;

  constructor(private fbStore: FirebaseService, private cache: LocalStorageService, public auth: AuthService) {
  }

  ngOnInit() {
    if (this.auth.isUserLoggedIn()) {
      let sub = this.fbStore.getUserData(this.auth.getUserData()?.email)
        .valueChanges()
        .subscribe((value: userData[]) => {
          console.log('oninit', value)
          if (value[0]) {

            this.active = value[0].active || this.active;
          }
          sub.unsubscribe()
        })
    }
    this.setIntervalBackup()
  }

  ngOnDestroy() {
  }

  setIntervalBackup() {
    this.intervalSub = interval(5000)
      .subscribe(() => {
        console.log('interval')
        if (this.auth.isUserLoggedIn()) {
          console.log('user is logged in')
          let sub = this.fbStore.getUserData(this.auth.getUserData()?.email)
            .valueChanges({idField: 'id'})
            .subscribe((value: any) => {
              console.log(value)
              if (value[0]?.id) {
                //update user data
                this.fbStore.updateDocument('userData',value[0].id,{active: this.active})
              }
              else {
                this.fbStore.createDocument(
                  'userData',
                  {
                    email: this.auth.getUserData()?.email,
                    active: this.active
                  }
                )
              }
              sub.unsubscribe()
            })
        }
        this.cache.setItem('active', this.active);
      });

  }

  onCharacterChange(event: Character) {
    this.selected = event;
    this.checked = this.active.includes(this.selected.id);
  }

  updateActive(event: boolean) {
    if (this.selected) {
      event ? this.active.push(this.selected?.id) : this.active = this.active.filter(item => item != this.selected?.id);
      this.characters = this.fbStore.getCollection('characters').valueChanges({idField: 'id'}) as Observable<Character[]>;
    }
  }

}
