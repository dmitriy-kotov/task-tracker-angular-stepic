import { createReducer } from '@ngrx/store';
import { initialMainPageState } from './state';

export const mainPageReducer = createReducer(initialMainPageState);
