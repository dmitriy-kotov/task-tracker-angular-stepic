import { createReducer, on } from '@ngrx/store';
import { initialTaskState } from './state';
import {
  addTaskAction,
  addTaskFailureAction,
  addTaskSuccessAction,
  deleteTaskAction,
  deleteTaskFailureAction,
  deleteTaskSuccessAction,
  loadTasksAction,
  loadTasksFailureAction,
  loadTasksSuccessAction,
  updateTaskAction,
  updateTaskFailureAction,
  updateTaskSuccessAction,
} from './action';

export const taskReducer = createReducer(
  initialTaskState,

  // --- Загрузка списка задач ---
  on(loadTasksAction, (state) => ({
    ...state,
    isLoadingTask: true,
    error: null,
  })),

  on(loadTasksSuccessAction, (state, { tasks }) => ({
    ...state,
    tasks,
    isLoadingTask: false,
    error: null,
  })),

  on(loadTasksFailureAction, (state, { error }) => ({
    ...state,
    isLoadingTask: false,
    error,
  })),

  // --- Добавление задачи ---
  on(addTaskAction, (state) => ({
    ...state,
    isLoadingTask: true,
  })),

  on(addTaskSuccessAction, (state, { task }) => ({
    ...state,
    isLoadingTask: false,
    // Добавляем новую задачу в конец массива
    tasks: [...state.tasks, task],
  })),

  on(addTaskFailureAction, (state, { error }) => ({
    ...state,
    isLoadingTask: false,
    error,
  })),

  // --- Обновление задачи ---
  on(updateTaskAction, (state) => ({
    ...state,
    isLoadingTask: true,
  })),

  on(updateTaskSuccessAction, (state, { task }) => ({
    ...state,
    isLoadingTask: false,
    tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
  })),

  on(updateTaskFailureAction, (state, { error }) => ({
    ...state,
    isLoadingTask: false,
    error,
  })),

  // --- Удаление задачи ---
  on(deleteTaskAction, (state) => ({
    ...state,
    isLoadingTask: true,
  })),

  on(deleteTaskSuccessAction, (state, { taskId }) => ({
    ...state,
    isLoadingTask: false,
    // Фильтруем удалённую задачу
    tasks: state.tasks.filter((t) => t.id !== taskId),
  })),

  on(deleteTaskFailureAction, (state, { error }) => ({
    ...state,
    isLoadingTask: false,
    error,
  }))
);
