import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Column } from '../interface/column/column';
import { Task } from '../interface/task/task';

@Injectable({
  providedIn: 'root',
})
export class FakeBackendService {
  private columnsStorageKey = 'taskTrackerColumns';
  private tasksStorageKey = 'taskTrackerTasks';

  constructor() {}

  // =========================================================================
  // COLUMNS
  // =========================================================================

  /**
   * Получение списка колонок.
   * Если в localStorage колонок нет, создаём три дефолтные.
   */
  getColumns(): Observable<Column[]> {
    let data = localStorage.getItem(this.columnsStorageKey);
    if (!data) {
      const defaultColumns: Column[] = [
        {
          id: 'column-1',
          typeColum: 'Нужно сделать',
          timeCreated: new Date(),
          positionNumber: 1,
        },
        {
          id: 'column-2',
          typeColum: 'В процессе',
          timeCreated: new Date(),
          positionNumber: 2,
        },
        {
          id: 'column-3',
          typeColum: 'На проверке',
          timeCreated: new Date(),
          positionNumber: 3,
        },
        {
          id: 'column-4',
          typeColum: 'Готово',
          timeCreated: new Date(),
          positionNumber: 4,
        },
      ];

      localStorage.setItem(
        this.columnsStorageKey,
        JSON.stringify(defaultColumns)
      );
      data = JSON.stringify(defaultColumns);
    }

    // Преобразуем в массив Column и возвращаем как Observable
    return of(JSON.parse(data));
  }

  /**
   * Полностью обновить список колонок (перезаписать в localStorage).
   */
  updateColumns(columns: Column[]): Observable<Column[]> {
    localStorage.setItem(this.columnsStorageKey, JSON.stringify(columns));
    return of(columns);
  }

  /**
   * Добавление новой колонки в список.
   * Возвращает обновлённый список колонок.
   */
  addColumn(newColumn: Column): Observable<Column[]> {
    const data = localStorage.getItem(this.columnsStorageKey);
    const columns: Column[] = data ? JSON.parse(data) : [];

    const duplicates: Column[] = columns.filter((c) => c.id === newColumn.id);
    if (duplicates.length == 0) {
      columns.push(newColumn);
      localStorage.setItem(this.columnsStorageKey, JSON.stringify(columns));
      return of(columns);
    }

    return throwError(() => new Error(`Element with same id: ${newColumn.id} has been found`));
  }

  deleteColumn(columnId: string): Observable<Column[]> {
    const data = localStorage.getItem(this.columnsStorageKey);
    let columns: Column[] = data ? JSON.parse(data) : [];

    columns = columns.filter((col) => col.id !== columnId);
    localStorage.setItem(this.columnsStorageKey, JSON.stringify(columns));

    // Additionally, you might want to remove tasks associated with the deleted column
    const tasksData = localStorage.getItem(this.tasksStorageKey);
    if (tasksData) {
      let tasks: Task[] = JSON.parse(tasksData);
      tasks = tasks.filter((task) => task.columnId !== columnId);
      localStorage.setItem(this.tasksStorageKey, JSON.stringify(tasks));
    }

    return of(columns);
  }

  /**
   * Обновление (редактирование) существующей колонки.
   * Возвращает обновлённый список колонок.
   */
  updateColumn(updatedColumn: Column): Observable<Column[]> {
    const data = localStorage.getItem(this.columnsStorageKey);
    const columns: Column[] = data ? JSON.parse(data) : [];

    const index = columns.findIndex((col) => col.id === updatedColumn.id);
    if (index !== -1) {
      columns[index] = updatedColumn; // перезаписываем колонку
      localStorage.setItem(this.columnsStorageKey, JSON.stringify(columns));
    }
    return of(columns);
  }

  // =========================================================================
  // TASKS
  // =========================================================================

  /**
   * Получение списка задач.
   * Если данных нет, записываем несколько дефолтных.
   */
  getTasks(): Observable<Task[]> {
    let data = localStorage.getItem(this.tasksStorageKey);

    // Если данные отсутствуют (null) или это пустой массив "[]", подставляем дефолтные
    if (!data || data === '[]') {
      const defaultTasks: Task[] = [
        {
          id: 'task-1',
          title: 'Купить продукты',
          description: 'Молоко, хлеб, яйца',
          columnId: 'column-1',
          timeCreate: new Date(),
          deadlineTime: new Date(),
        },
        {
          id: 'task-2',
          title: 'Сделать уборку',
          description: 'Пропылесосить и помыть полы',
          columnId: 'column-1',
          timeCreate: new Date(),
          deadlineTime: new Date(),
        },
        {
          id: 'task-3',
          title: 'Написать код',
          description: 'Реализовать новый сервис',
          columnId: 'column-3',
          timeCreate: new Date(),
          deadlineTime: new Date(),
        },
      ];

      localStorage.setItem(this.tasksStorageKey, JSON.stringify(defaultTasks));
      data = JSON.stringify(defaultTasks);
    }

    return of(JSON.parse(data));
  }

  /**
   * Полностью обновить список задач (перезаписать в localStorage).
   */
  updateTasks(tasks: Task[]): Observable<Task[]> {
    localStorage.setItem(this.tasksStorageKey, JSON.stringify(tasks));
    return of(tasks);
  }

  /**
   * Добавление новой задачи.
   * Возвращает обновлённый список задач.
   */
  addTask(newTask: Task): Observable<Task[]> {
    const data = localStorage.getItem(this.tasksStorageKey);
    const tasks: Task[] = data ? JSON.parse(data) : [];

    const duplicates: Task[] = tasks.filter((t) => t.id === newTask.id);
    if (duplicates.length == 0) {
      tasks.push(newTask);
      localStorage.setItem(this.tasksStorageKey, JSON.stringify(tasks));
      return of(tasks);
    }

    return throwError(() => new Error(`Element with same id: ${newTask.id} has been found`));
  }

  /**
   * Обновление (редактирование) существующей задачи.
   * Возвращает обновлённый список задач.
   */
  updateTask(updatedTask: Task): Observable<Task[]> {
    const data = localStorage.getItem(this.tasksStorageKey);
    const tasks: Task[] = data ? JSON.parse(data) : [];

    const index = tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask; // перезаписываем задачу
      localStorage.setItem(this.tasksStorageKey, JSON.stringify(tasks));
      return of(tasks);
    }

    return throwError(() => new Error(`Task with id: ${updatedTask.id} was not found among others`));
  }

  deleteTask(taskId: string): Observable<Task[]> {
    const data = localStorage.getItem(this.tasksStorageKey);
    let tasks: Task[] = data ? JSON.parse(data) : [];

    tasks = tasks.filter((t) => t.id !== taskId);
    localStorage.setItem(this.tasksStorageKey, JSON.stringify(tasks));

    return of(tasks);
  }
}
