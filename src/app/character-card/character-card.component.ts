import { Component, Input, OnInit } from '@angular/core';
import { MatCard, MatCardAvatar, MatCardHeader, MatCardSubtitle, MatCardTitle } from "@angular/material/card";
import { NgIf } from "@angular/common";
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
    MatCardAvatar
  ],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css'
})
export class CharacterCardComponent{
  @Input() character!: Character;
  @Input() pictureUrl?: string;
  @Input() active: boolean = false;
}
