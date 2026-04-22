import { Component, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { Task } from '../../interface/task/task';
import { deleteTaskAction } from './store/action';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  task = input.required<Task>();
  isEditing: boolean = false;

  constructor(private store: Store) {}

  editTask() {}

  deleteTask() {
    this.store.dispatch(deleteTaskAction({ taskId: this.task().id }));
  }
}
