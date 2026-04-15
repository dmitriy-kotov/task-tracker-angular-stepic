import { createAction, props } from '@ngrx/store';
import { Column } from '../../../interface/column/column';

export const loadColumnsAction = createAction('[Column] Load Columns');

export const loadColumnsSuccessAction = createAction(
  '[Column] Load Columns Success',
  props<{ columns: Column[] }>()
);

export const loadColumnsFailureAction = createAction(
  '[Column] Load Columns Failure',
  props<{ error: any }>()
);

// Создание (create) новой колонки
export const createColumnAction = createAction(
  '[Column] Create Column',
  props<{ column: Column }>()
);

export const createColumnSuccessAction = createAction(
  '[Column] Create Column Success',
  props<{ column: Column }>()
);

export const createColumnFailureAction = createAction(
  '[Column] Create Column Failure',
  props<{ error: any }>()
);

// Удаление (delete) колонки
export const deleteColumnAction = createAction(
  '[Column] Delete Column',
  props<{ columnId: string }>()
);

export const deleteColumnSuccessAction = createAction(
  '[Column] Delete Column Success',
  props<{ columnId: string }>()
);

export const deleteColumnFailureAction = createAction(
  '[Column] Delete Column Failure',
  props<{ error: any }>()
);

// Перестановка (reorder) колонок
export const reorderColumnsAction = createAction(
  '[Column] Reorder Columns',
  props<{ columns: Column[] }>()
);

export const reorderColumnsSuccessAction = createAction(
  '[Column] Reorder Columns Success',
  props<{ columns: Column[] }>()
);

export const reorderColumnsFailureAction = createAction(
  '[Column] Reorder Columns Failure',
  props<{ error: any }>()
);
