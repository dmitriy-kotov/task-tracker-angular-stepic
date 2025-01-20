import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  createColumnAction,
  createColumnFailureAction,
  createColumnSuccessAction,
  deleteColumnAction,
  deleteColumnFailureAction,
  deleteColumnSuccessAction,
  loadColumnsAction,
  loadColumnsFailureAction,
  loadColumnsSuccessAction,
  reorderColumnsAction,
  reorderColumnsFailureAction,
  reorderColumnsSuccessAction,
} from "./action";
import {FakeBackendService} from "../../../fakeBackEndService/fake-backend.service";
import {Column} from "../../../interface/column/column";

@Injectable()
export class ColumnEffects {
  loadColumns$;
  reorderColumns$;
  createColumn$;
  deleteColumn$;

  constructor(
    private actions$: Actions,
    private fakeBackendService: FakeBackendService
  ) {
    this.loadColumns$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadColumnsAction),
        mergeMap(() =>
          this.fakeBackendService.getColumns().pipe(
            map(columns => loadColumnsSuccessAction({columns: columns})),
            catchError(error => of(loadColumnsFailureAction({error})))
          )
        )
      )
    );

    this.reorderColumns$ = createEffect(() =>
      this.actions$.pipe(
        ofType(reorderColumnsAction),
        mergeMap(({ columns }) =>
          this.fakeBackendService.updateColumns(columns).pipe(
            // По окончании сохраняем обновлённый порядок в стор
            map((updatedColumns) => reorderColumnsSuccessAction({ columns: updatedColumns })),
            catchError((error) => of(reorderColumnsFailureAction({ error })))
          )
        )
      )
    );

    this.createColumn$ = createEffect(() =>
      this.actions$.pipe(
        ofType(createColumnAction),
        mergeMap(({ column }) =>
          this.fakeBackendService.addColumn(column).pipe(
            map((updatedColumns: Column[]) => {
              const createdColumn = updatedColumns.find(col => col.id === column.id);
              return createdColumn
                ? createColumnSuccessAction({ column: createdColumn })
                : createColumnFailureAction({ error: 'Column not found after creation.' });
            }),
            catchError((error) => of(createColumnFailureAction({ error })))
          )
        )
      )
    );

    this.deleteColumn$ = createEffect(() =>
      this.actions$.pipe(
        ofType(deleteColumnAction),
        mergeMap(({ columnId }) =>
          this.fakeBackendService.deleteColumn(columnId).pipe(
            map(() => deleteColumnSuccessAction({ columnId })),
            catchError((error) => of(deleteColumnFailureAction({ error })))
          )
        )
      )
    );
  }
}
