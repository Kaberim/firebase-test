import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCard } from "@angular/material/card";
import { Task } from "./task";
import { CommonModule, NgIf } from "@angular/common";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatCard,
    NgIf
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task?: Task;
  @Output() edit = new EventEmitter<Task>();
}
