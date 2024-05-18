import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {filter, interval, map, Observable, Subscription, switchMap, tap} from "rxjs";
import {Character} from "../data/character";
import {MatDialog} from "@angular/material/dialog";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {FirebaseService} from "../services/firebase.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {CharacterCardComponent} from "../character-card/character-card.component";
import {LocalStorageService} from "../services/cache.service";
import {CharacterRelicSet} from "../data/relic-set";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {userData} from "../data/user-data";
import {CharacterDetailsComponent} from "../character-details/character-details.component";

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
        RouterLink,
        CharacterDetailsComponent
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {
    checked = false;
    characters = this.fbStore.getCollection('characters').valueChanges({idField: 'id'}) as Observable<Character[]>;
    activeCharacters = this.characters.pipe(
        map(value => value.filter(character => this.active.includes(character.id)))
    );
    active: string[] = this.cache.getItem('active') || [];

    kits: { characterId: string, relics: CharacterRelicSet }[] = this.cache.getItem('kits') || [];
    selected?: Character;
    relicsData?: CharacterRelicSet;

    intervalSub?: Subscription;

    constructor(private fbStore: FirebaseService, private cache: LocalStorageService, public auth: AuthService) {
    }

    ngOnInit() {
        if (this.auth.isUserLoggedIn()) {
            let sub = this.fbStore.getUserData(this.auth.getUserData()?.email)
                .valueChanges()
                .subscribe((value: userData[]) => {
                    if (value[0]) {
                        this.active = value[0].active || this.active;
                        this.kits = value[0].kits || this.kits;
                    }
                    sub.unsubscribe();
                });
        }
        this.setIntervalBackup();
    }

    ngOnDestroy() {
        this.intervalSub?.unsubscribe();
    }

    setIntervalBackup() {
        let email = this.auth.getUserData()?.email;
        // Interval backup every 5 seconds
        this.intervalSub = interval(5000)
            .subscribe(() => {
                // If user is logged in, save their data
                if (this.auth.isUserLoggedIn()) {
                    let sub = this.fbStore.getUserData(email)
                        .valueChanges({idField: 'id'})
                        .subscribe((value: any) => {
                            // If there is already a record linked to this account, overwrite it. Otherwise, create a new record.
                            if (value[0]?.id) {
                                this.fbStore.updateDocument('userData', value[0].id, {
                                    active: this.active,
                                    kits: this.kits
                                });
                            } else {
                                this.fbStore.createDocument(
                                    'userData',
                                    {
                                        email: email,
                                        active: this.active,
                                        kits: this.kits
                                    }
                                );
                            }
                            sub.unsubscribe();
                        });
                    email && this.cache.setItem(email, {active: this.active});
                } else {
                    // Anonymous cache save
                    this.cache.setItem('active', this.active);
                    this.cache.setItem('kits', this.kits);
                }
            });
    }

    onCharacterChange(event: Character) {
        this.selected = event;
        this.checked = this.active.includes(this.selected.id);
        // Load the selected character's relics if already present in kits
        const characterKit = this.kits.find(kit => kit.characterId === event.id);
        if (characterKit) {
            // Pass the existing relics data to the child component
            this.relicsData = characterKit.relics;
        } else {
            this.relicsData = {
              head: {
                setId: undefined
              },
              arms: {
                setId: undefined,
              },
              body: {
                setId: undefined,
              },
              feet: {
                setId: undefined
              }
            } as CharacterRelicSet;
        }
    }

    updateActive(event: boolean) {
        if (this.selected) {
            if (event) {
                this.active.push(this.selected?.id);
            } else {
                this.active = this.active.filter(item => item != this.selected?.id);
            }
            this.characters = this.fbStore.getCollection('characters').valueChanges({idField: 'id'}) as Observable<Character[]>;
        }
    }

    updateKits(relics: CharacterRelicSet) {
        if (this.selected) {
            const existingKitIndex = this.kits.findIndex(kit => kit.characterId === this.selected!.id);
            if (existingKitIndex > -1) {
                this.kits[existingKitIndex].relics = relics;
            } else {
                this.kits.push({characterId: this.selected!.id, relics});
            }
        }
    }
}
