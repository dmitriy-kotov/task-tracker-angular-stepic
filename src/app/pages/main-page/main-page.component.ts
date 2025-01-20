import { Component, computed, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule, JsonPipe } from '@angular/common';
import { ColumnComponent } from '../../feature/column/column.component';
import { loadColumnsAction, reorderColumnsAction } from '../../feature/column/store/action';
import { selectAllColumns } from '../../feature/column/store/selector';
import { initialColumnState } from '../../feature/column/store/state';
import { Column } from '../../interface/column/column';
import { toSignal } from '@angular/core/rxjs-interop';
import { Task } from '../../interface/task/task';
import { initialTaskState } from '../../feature/task/store/state';
import { selectAllTasks } from '../../feature/task/store/selector';
import { loadTasksAction } from '../../feature/task/store/action';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import {MatDialog} from "@angular/material/dialog";
import {CreateColumnComponent} from "../../entities/modal/create-column/create-column.component";
import {DelColumnComponent} from "../../entities/modal/del-column/del-column.component";

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    ColumnComponent,
    CdkDropList,
    CdkDrag,
    ColumnComponent,
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  columns: Signal<Column[]>;
  tasks: Signal<Task[]>;

  constructor(private store: Store, private dialog: MatDialog) {
    this.store.dispatch(loadColumnsAction());
    this.store.dispatch(loadTasksAction());

    this.columns = toSignal(this.store.select(selectAllColumns), {
      initialValue: initialColumnState.columns,
    });
    this.tasks = toSignal(this.store.select(selectAllTasks), {
      initialValue: initialTaskState.tasks,
    });
  };

  columnsWithTasks = computed(() => {
    const c = this.columns();
    const t = this.tasks();

    return c.map((column) => ({
      ...column,
      tasks: t.filter((task) => task.columnId === column.id),
    }));
  });

  allColumnIds(): string[] {
    return this.columns().map(c => c.id);
  };

  dropColumn(event: CdkDragDrop<Column[]>) {
    if (event.previousIndex === event.currentIndex) return;
    const updatedColumns = [...this.columns()];
    moveItemInArray(updatedColumns, event.previousIndex, event.currentIndex);
    this.store.dispatch(reorderColumnsAction({ columns: updatedColumns }));
  };

  openModalAddColumn() {
    this.dialog.open(CreateColumnComponent, {
      width: '400px',
    });
  };

  openModalDelColumn() {
    this.dialog.open(DelColumnComponent, {
      width: '400px',
    });
  };
}
