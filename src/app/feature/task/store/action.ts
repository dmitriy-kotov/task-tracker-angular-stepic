import { createAction, props } from '@ngrx/store';
import { Task } from '../../../interface/task/task';


// Загрузка задач
export const loadTasksAction = createAction('[Task] Load Tasks');
export const loadTasksSuccessAction = createAction('[Task] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailureAction = createAction('[Task] Load Tasks Failure', props<{ error: any }>());

// Добавление задачи
export const addTaskAction = createAction('[Task] Add Task', props<{ task: Task }>());
export const addTaskSuccessAction = createAction('[Task] Add Task Success', props<{ task: Task }>());
export const addTaskFailureAction = createAction('[Task] Add Task Failure', props<{ error: any }>());

// Обновление задачи
export const updateTaskAction = createAction('[Task] Update Task', props<{ task: Task }>());
export const updateTaskSuccessAction = createAction('[Task] Update Task Success', props<{ task: Task }>());
export const updateTaskFailureAction = createAction('[Task] Update Task Failure', props<{ error: any }>());

// Удаление задачи
export const deleteTaskAction = createAction('[Task] Delete Task', props<{ taskId: string }>());
export const deleteTaskSuccessAction = createAction('[Task] Delete Task Success', props<{ taskId: string }>());
export const deleteTaskFailureAction = createAction('[Task] Delete Task Failure', props<{ error: any }>());
