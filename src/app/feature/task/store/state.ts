import { Task } from "../../../interface/task/task";

export interface TaskState {
  tasks: Task[];
  isLoadingTask: boolean;
  error: any;
}

export const initialTaskState: TaskState = {
  tasks: [],
  isLoadingTask: false,
  error: null,
};
