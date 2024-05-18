import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Character} from "../data/character";
import {Observable, Subscription} from "rxjs";
import {FirebaseService} from "../services/firebase.service";
import {CharacterRelicSet, RelicSet} from "../data/relic-set";

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selected?: Character;
  @Input() checked: boolean = false;
  @Input() relicsData?: CharacterRelicSet;
  @Output() updateActive = new EventEmitter<boolean>();
  @Output() formValuesChange = new EventEmitter<CharacterRelicSet>(); // New output for form values

  relics: Observable<RelicSet[]>;

  relicForm: FormGroup;

  observables: Subscription[] = [];

  constructor(private fbStore: FirebaseService, private fb: FormBuilder) {
    this.relics = this.fbStore.getCollection('relicSets').valueChanges({ idField: 'id' }) as Observable<RelicSet[]>;
    this.relicForm = this.fb.group({
      head: this.fb.group({
        setId: ['']
      }),
      arms: this.fb.group({
        setId: ['']
      }),
      body: this.fb.group({
        setId: ['']
      }),
      feet: this.fb.group({
        setId: ['']
      })
    });
  }

  ngOnInit() {
    this.relics.subscribe(value => console.log(value));
    this.observables.push(this.relicForm.valueChanges.subscribe(values => {
      this.formValuesChange.emit(values);
    }));
  }

  onUpdateActive(event: boolean) {
    this.updateActive.emit(event);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['relicsData'] && this.relicsData) {
      this.relicForm.patchValue(this.relicsData);
    }
  }

  ngOnDestroy() {
    for (const e of this.observables) {
      e.unsubscribe();
    }
  }
}
