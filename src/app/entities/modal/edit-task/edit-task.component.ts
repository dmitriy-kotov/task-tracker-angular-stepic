import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Task } from '../../../interface/task/task';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { updateTaskAction } from '../../../feature/task/store/action';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss',
})
export class EditTaskComponent implements OnInit {
  form!: FormGroup;
  readonly task!: Task;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditTaskComponent>,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.task = this.data.task;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [
        this.task.title,
        [Validators.required, Validators.maxLength(255)],
      ],
      description: [
        this.task.description,
        [Validators.required, Validators.maxLength(255)],
      ],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const newTask: Task = {
        id: this.task.id,
        title: this.form.value.title.trim(),
        description: this.form.value.description.trim(),
        columnId: this.task.columnId,
        timeCreate: this.task.timeCreate,
        deadlineTime: this.task.deadlineTime,
      };

      this.store.dispatch(updateTaskAction({ task: newTask }));
      this.dialogRef.close();
    }
  }
}
