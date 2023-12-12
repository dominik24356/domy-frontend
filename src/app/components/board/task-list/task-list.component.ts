import {Component, Input} from '@angular/core';
import {TaskList} from "../../../models/task-list";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() taskList: TaskList = new TaskList()
}
