import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BoardService} from "../../../../services/board.service";

@Component({
  selector: 'app-delete-board-alert',
  templateUrl: './delete-board-alert.component.html',
  styleUrls: ['./delete-board-alert.component.css']
})
export class DeleteBoardAlertComponent {
  @Input() show: boolean = false;
  @Input() boardName: string | undefined;
  @Input() boardId: number | undefined;
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();


  constructor(private boardService:BoardService) {

  }


  confirmDelete(): void {
    if (this.boardId) {

      // new variant of .subscribe
      this.boardService.deleteBoard(this.boardId).subscribe({
        next: () => {
          this.confirm.emit();
        },
        error: (error: any) => {
          console.error('Error deleting board:', error);
        }
      });

    } else {
      console.error('Board id is undefined');
    }
  }

  cancelDelete() {
    this.cancel.emit();
  }

}
