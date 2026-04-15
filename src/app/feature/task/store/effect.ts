import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FakeBackendService } from '../../../fakeBackEndService/fake-backend.service';
import {
  loadTasksAction,
  loadTasksFailureAction,
  loadTasksSuccessAction,
  updateTaskAction,
  updateTaskFailureAction,
  updateTaskSuccessAction,
} from './action';

@Injectable()
export class TaskEffects {
  loadTask$;
  updateTask$;

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
  }
}
