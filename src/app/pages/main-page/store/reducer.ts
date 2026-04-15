import { createReducer, on } from '@ngrx/store';
import { initialMainPageState } from './state';
import { setTitle } from './action';

export const mainPageReducer = createReducer(
  initialMainPageState,
  on(setTitle, (state, { title }) => ({ ...state, title }))
);
