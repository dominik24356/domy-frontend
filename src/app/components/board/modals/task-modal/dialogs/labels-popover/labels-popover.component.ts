import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LabelColor, Task} from "../../../../../../models/task";
import {BoardService} from "../../../../../../services/board.service";


@Component({
  selector: 'app-labels-popover',
  templateUrl: './labels-popover.component.html',
  styleUrls: ['./labels-popover.component.css']
})
export class LabelsPopoverComponent {

  @Output() closePopover: EventEmitter<void> = new EventEmitter<void>();
  @Output() addLabel: EventEmitter<void> = new EventEmitter<void>();
  @Input() boardId!: number;

  labelName: string = '';
  selectedColor: LabelColor | null = null;

  // error message
  errorMessage: string = '';

  constructor(private boardService: BoardService) { }


  selectColor(color: LabelColor) {
    this.selectedColor = color;
  }

  addNewLabel() {
    if (this.labelName && this.selectedColor) {
      this.boardService.addLabel(this.boardId, this.labelName, this.selectedColor).subscribe({
        next: () => {
          this.addLabel.emit();
          this.close();
        },
        error: (error: any) => {
          this.errorMessage = 'Error adding label';
          console.error('Error adding label:', error);
        }
      });
    }

  }

  close() {
    this.closePopover.emit();
  }

  protected readonly LabelColor = LabelColor;
}
