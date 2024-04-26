import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { MatCard, MatCardAvatar, MatCardHeader, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { NgClass, NgIf } from "@angular/common";
import { Character } from "../data/character";

@Component({
  selector: 'app-character-card',
  standalone: true,
  imports: [
    MatCard,
    NgIf,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardAvatar,
    NgClass
  ],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css'
})
export class CharacterCardComponent implements OnInit{
  @Input() character!: Character;
  @Input() pictureUrl?: string;
  @Input() active: boolean = false;
  @Output() selected: EventEmitter<Character> = new EventEmitter<Character>()

  ngOnInit() {
    // console.log(this.character)
  }

  emitClick(){
    this.selected.emit(this.character);
  }

}
