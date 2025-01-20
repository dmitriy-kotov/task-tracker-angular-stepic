import {Column} from "../../../interface/column/column";

export interface ColumnState {
  columns: Column[];
  isLoadingColumn: boolean;
  error: any;
}

export const initialColumnState: ColumnState = {
  columns: [],
  isLoadingColumn: false,
  error: null,
};
