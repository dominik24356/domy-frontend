import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-delete-board-alert',
  templateUrl: './delete-board-alert.component.html',
  styleUrls: ['./delete-board-alert.component.css']
})
export class DeleteBoardAlertComponent {
  @Input() show: boolean = false;
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input() boardName: string = '';

  confirmDelete() {
    this.confirm.emit();
  }

  cancelDelete() {
    this.cancel.emit();
  }

}
