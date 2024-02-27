import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BoardService} from "../../../../services/board.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-board-title-alert',
  templateUrl: './change-board-title-alert.component.html',
  styleUrls: ['./change-board-title-alert.component.css']
})
export class ChangeBoardTitleAlertComponent {
  @Input() show: boolean = false;
  @Input() boardId: number = 0;
  newTitle: string = '';
  errorMessage: string = '';

  // handle cancel emitter
  @Output() cancelClicked = new EventEmitter<void>();

  constructor(private fb: FormBuilder,private boardService: BoardService) {

  }

  handleEditBoardTitle() {
    if (this.newTitle.trim() === '') {
      this.errorMessage = 'Title cannot be empty';
      return;
    }

    this.boardService.updateBoard(this.boardId, this.newTitle).subscribe(
      () => {
        this.handleCancelEditBoardTitle();
        this.newTitle = '';
        this.errorMessage = '';
        location.reload();

      },
      (error) => {
        this.errorMessage = 'An error occurred while updating the title';
        console.error('Error updating title:', error);
      }
    );
  }

  handleCancelEditBoardTitle() {
    this.cancelClicked.emit();
  }
}
