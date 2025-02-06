import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Character } from "../data/character";
import { Observable, Subscription } from "rxjs";
import { FirebaseService } from "../services/firebase.service";
import { CharacterRelicSet, RelicSet } from "../data/relic-set";

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
    relicsStatic: RelicSet[] = [];

    relicForm: FormGroup;

    observables: Subscription[] = [];

    activeSets: string[] = [];

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
        this.relics.subscribe(value => {
          this.relicsStatic = value;
          this.updateSetCounts();
        });
        this.observables.push(this.relicForm.valueChanges.subscribe(values => {
            this.formValuesChange.emit(values);
            this.updateSetCounts();
        }));
    }

    onUpdateActive(event: boolean) {
        this.updateActive.emit(event);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['relicsData'] && this.relicsData) {
            this.relicForm.patchValue(this.relicsData);
            this.updateSetCounts();
        }
    }

    ngOnDestroy() {
        for (const e of this.observables) {
            e.unsubscribe();
        }
    }

    updateSetCounts() {
        this.activeSets = [];
        const setIdCounts: { [key: string]: number } = {};

        const formValues = this.relicForm.value;

        const setIds = [
            formValues.head.setId,
            formValues.arms.setId,
            formValues.body.setId,
            formValues.feet.setId
        ];

        setIds.forEach(setId => {
            if (setId) {
                if (!setIdCounts[setId]) {
                    setIdCounts[setId] = 0;
                }
                setIdCounts[setId]++;
            }
        });

        for (const set of Object.keys(setIdCounts)) {
            if (setIdCounts[set] == 2) {
              this.addSet(set, '2 piece')
            }

            if(setIdCounts[set] == 4) {
              this.addSet(set, '4 piece')
            }
        }

        console.log(this.activeSets)
    }

    addSet(id: string, piece: ('2 piece' | '4 piece')){
      let gotSet = this.getRelicSetById(id)
      if( gotSet != undefined) this.activeSets.push(gotSet.name + ' (' + piece + '): ' + gotSet[piece])
    }

    getRelicSetById(id: string): RelicSet | undefined {
        return this.relicsStatic.find(relic => relic.id === id);
    }

    protected readonly Object = Object;

}
