import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TaskState} from "./state";

export const selectTaskState = createFeatureSelector<TaskState>('taskState')

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks,
)
