import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FakeBackendService } from '../../../fakeBackEndService/fake-backend.service';
import {
  addTaskAction,
  addTaskFailureAction,
  addTaskSuccessAction,
  loadTasksAction,
  loadTasksFailureAction,
  loadTasksSuccessAction,
  updateTaskAction,
  updateTaskFailureAction,
  updateTaskSuccessAction,
  deleteTaskAction,
  deleteTaskSuccessAction,
  deleteTaskFailureAction,
} from './action';
import { Task } from '../../../interface/task/task';

@Injectable()
export class TaskEffects {
  loadTask$;
  updateTask$;
  addTask$;
  deleteTask$;

  constructor(
    private actions$: Actions,
    private fakeBackendService: FakeBackendService
  ) {
    this.loadTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadTasksAction),
        mergeMap(() =>
          this.fakeBackendService.getTasks().pipe(
            map((tasks) => loadTasksSuccessAction({ tasks: tasks })),
            tap((tasks) => {
              console.log(tasks);
            }),
            catchError((error) => of(loadTasksFailureAction({ error })))
          )
        )
      )
    );

    this.updateTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updateTaskAction),
        mergeMap(({ task }) =>
          this.fakeBackendService.updateTask(task).pipe(
            map(() => updateTaskSuccessAction({ task })),
            catchError((error) => of(updateTaskFailureAction({ error })))
          )
        )
      )
    );

    this.addTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addTaskAction),
        mergeMap(({ task }) =>
          this.fakeBackendService.addTask(task).pipe(
            map((updatedTasks: Task[]) => {
              const createdTask = updatedTasks.find((t) => t.id === task.id);
              return createdTask
                ? addTaskSuccessAction({ task: createdTask })
                : addTaskFailureAction({
                    error: 'Task not found after creation.',
                  });
            }),
            catchError((error) => of(addTaskFailureAction({ error })))
          )
        )
      )
    );

    this.deleteTask$ = createEffect(() =>
      this.actions$.pipe(
        ofType(deleteTaskAction),
        mergeMap(({ taskId }) =>
          this.fakeBackendService.deleteColumn(taskId).pipe(
            map(() => deleteTaskSuccessAction({ taskId })),
            catchError((error) => of(deleteTaskFailureAction({ error })))
          )
        )
      )
    );
  }
}
