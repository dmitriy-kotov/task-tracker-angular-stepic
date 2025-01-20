import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ColumnState} from "./state";

export const selectColumnsState = createFeatureSelector<ColumnState>('columnState')

export const selectAllColumns = createSelector(
  selectColumnsState,
  (state: ColumnState) => state.columns,
);
