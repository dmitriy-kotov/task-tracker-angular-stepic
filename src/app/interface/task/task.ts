export interface Task {
  id: string;
  title: string;
  description: string;
  columnId: string;
  timeCreate: Date;
  deadlineTime: Date;
  priority?: 'low' | 'medium' | 'high';
}
