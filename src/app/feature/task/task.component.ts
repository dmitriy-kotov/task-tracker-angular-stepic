import { Component, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { Task } from '../../interface/task/task';
import { deleteTaskAction } from './store/action';
import { EditTaskComponent } from '../../entities/modal/edit-task/edit-task.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private store: Store, private dialog: MatDialog) {}

  openModalEditTask() {
    this.dialog.open(EditTaskComponent, {
      width: '400px',
      data: {
        columnId: this.task().columnId,
      },
    });
  }

  deleteTask() {
    this.store.dispatch(deleteTaskAction({ taskId: this.task().id }));
  }
}
