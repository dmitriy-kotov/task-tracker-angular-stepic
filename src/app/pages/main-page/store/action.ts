import { createAction, props } from '@ngrx/store';

export const setTitle = createAction(
  '[Main Page] Set Title',
  props<{ title: string }>()
);
