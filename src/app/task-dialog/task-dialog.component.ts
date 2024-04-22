import { Component, Inject } from '@angular/core';
import { MatFormField } from "@angular/material/form-field";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatInput, MatInputModule } from "@angular/material/input";
import { MatButton, MatFabButton } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { Task } from "../task/task";
import { MatIcon } from "@angular/material/icon";

export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButton,
    MatFabButton,
    MatIcon
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css'
})
export class TaskDialogComponent {
  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  cancel(): void {
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.dialogRef.close(this.data);
  }
}
