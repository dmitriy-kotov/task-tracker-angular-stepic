import { Component, input } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Task } from '../../interface/task/task';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  task = input.required<Task>();
  isEditing: boolean = false;

  editTask() {
  };

  deleteTask() {
  };

}
