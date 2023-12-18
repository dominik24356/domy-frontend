import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-delete-task-list-alert',
  templateUrl: './delete-task-list-alert.component.html',
  styleUrls: ['./delete-task-list-alert.component.css']
})
export class DeleteTaskListAlertComponent {
  @Input() show: boolean = false;
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  confirmDelete() {
    this.confirm.emit();
  }

  cancelDelete() {
    this.cancel.emit();
  }
}
