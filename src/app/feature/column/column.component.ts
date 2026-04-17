import { Component, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from '../task/task.component';
import { Column } from '../../interface/column/column';
import { Task } from '../../interface/task/task';
import { CreateTaskComponent } from '../../entities/modal/create-task/create-task.component';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { NgForOf } from '@angular/common';
import { updateTaskAction } from '../task/store/action';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-column',
  standalone: true,
  imports: [FormsModule, TaskComponent, CdkDrag, CdkDropList, NgForOf, MatIcon],
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  column = input.required<Column & { tasks: Task[] }>();
  connectedIds = input.required<string[]>();

  constructor(private store: Store, private dialog: MatDialog) {}

  dropTask(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      const tasks = [...this.column().tasks];
      moveItemInArray(tasks, event.previousIndex, event.currentIndex);
      return;
    }

    const previousTasks = [...event.previousContainer.data];
    const currentTasks = [...event.container.data];

    transferArrayItem(
      previousTasks,
      currentTasks,
      event.previousIndex,
      event.currentIndex
    );

    const movedTask = currentTasks[event.currentIndex];

    const updatedTask: Task = {
      ...movedTask,
      columnId: this.column().id,
    };

    this.store.dispatch(updateTaskAction({ task: updatedTask }));
  }

  openModalAddTask() {
    this.dialog.open(CreateTaskComponent, {
      width: '400px',
    });
  }
}
