import { Component, OnInit } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { filter, map, Observable, tap } from "rxjs";
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
export class HomePageComponent implements OnInit {
  checked = false;
  characters = this.fbStore.getCollection('characters').valueChanges({idField: 'id'}) as Observable<Character[]>
  activeCharacters = this.characters.pipe(
    map(value => value.filter(character => this.active.includes(character.id)))
  );
  active: string[] = this.cache.getItem('active') || []

  kits: { characterId: string, relics: RelicSet }[] = this.cache.getItem('kits') || [];
  selected?: Character;

  constructor(private fbStore: FirebaseService, private cache: LocalStorageService) {
  }

  ngOnInit() {
    // interval(this.intervalTime).subscribe(() => {
    //   const myObject = {key: 'value'}; // Replace with your object
    //   localStorage.setItem(this.myObjectKey, JSON.stringify(myObject));
    // });
  }

  onCharacterChange(event: Character){
    this.selected = event;
    this.checked = this.active.includes(this.selected.id);
  }

  updateActive(event:boolean){
    if(this.selected){
      event ? this.active.push(this.selected?.id) : this.active = this.active.filter(item => item != this.selected?.id);
      this.cache.setItem('active', this.active);
      this.characters = this.fbStore.getCollection('characters').valueChanges({idField: 'id'}) as Observable<Character[]>;
    }
  }

}
