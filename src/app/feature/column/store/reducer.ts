// src/app/entities/modal/create-column/store/reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialColumnState } from './state';
import {
  loadColumnsAction,
  loadColumnsSuccessAction,
  loadColumnsFailureAction,
  reorderColumnsSuccessAction,
  reorderColumnsFailureAction,
  createColumnAction,
  createColumnSuccessAction,
  createColumnFailureAction,
  deleteColumnFailureAction,
  deleteColumnSuccessAction,
  deleteColumnAction
} from "./action";

export const columnReducer = createReducer(
  initialColumnState,

  // Load Columns
  on(loadColumnsAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(loadColumnsSuccessAction, (state, { columns }) => ({
    ...state,
    columns: columns,
    isLoading: false,
  })),

  on(loadColumnsFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  // Reorder Columns
  on(reorderColumnsSuccessAction, (state, { columns }) => ({
    ...state,
    columns: columns,
    isLoading: false,
    error: null,
  })),

  on(reorderColumnsFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  // Create Column
  on(createColumnAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(createColumnSuccessAction, (state, { column }) => ({
    ...state,
    columns: [...state.columns, column],
    isLoading: false,
    error: null,
  })),

  on(createColumnFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  })),

  on(deleteColumnAction, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(deleteColumnSuccessAction, (state, { columnId }) => ({
    ...state,
    columns: state.columns.filter(column => column.id !== columnId),
    isLoading: false,
    error: null,
  })),
  on(deleteColumnFailureAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error,
  }))
);
