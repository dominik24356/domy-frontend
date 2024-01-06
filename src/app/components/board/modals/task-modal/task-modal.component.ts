import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../../../models/task";
import {last} from "rxjs";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  @Input() showModal: boolean = false;
  @Input() task: Task | undefined;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  protected readonly last = last;
}
