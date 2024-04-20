import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Label, LabelColor} from "../../../../../../../models/task";
import {BoardService} from "../../../../../../../services/board.service";

@Component({
  selector: 'app-main-label-popover',
  templateUrl: './main-label-popover.component.html',
  styleUrls: ['./main-label-popover.component.css']
})
export class MainLabelPopoverComponent implements OnInit{
  searchQuery: string = '';
  labels: Label[] = [];
  filteredLabels: Label[] = [];
  errorMessage: string = '';

  @Output() closePopover: EventEmitter<void> = new EventEmitter<void>();
  @Output() createNewLabel: EventEmitter<void> = new EventEmitter<void>();
  @Input() boardId!: number;
  @Input() taskId!: number;

  constructor(private boardService: BoardService) {

  }

  ngOnInit(): void {
    this.getLabels();
  }

  getLabels(): void {
    this.boardService.getLabels(this.boardId).subscribe({
      next: (labels: Label[]) => {
        this.labels = labels;
        this.filteredLabels = [...labels];
      },
      error: (error: any) => {
        this.errorMessage = 'Error getting labels';
        console.error('Error getting labels:', error);
      }
    });
  }


  filterLabels(): void {
    this.filteredLabels = this.labels.filter(label =>
      label.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }


  showCreateNewLabelForm(): void {
    this.createNewLabel.emit();
  }


  close() {
    this.closePopover.emit();
  }

  assignOrUnassign(label: Label): void {
    if (label.taskIds && label.taskIds.includes(this.taskId)) {
      this.unassign(label);
    } else {
      this.assign(label);
    }
  }

  assign(label: any) {
    this.boardService.assignLabelToTask(this.taskId, label.labelId).subscribe({
      next: () => {
        this.getLabels();
      },
      error: (error: any) => {
        this.errorMessage = 'Error assigning label';
        console.error('Error assigning label:', error);
      }
    });
  }

  unassign(label: any) {
    this.boardService.unassignLabelFromTask(this.taskId, label.labelId).subscribe({
      next: () => {
        this.getLabels();
      },
      error: (error: any) => {
        this.errorMessage = 'Error unassigning label';
        console.error('Error unassigning label:', error);
      }
    });
  }

  getColor(colorName: string): string {
    switch (colorName.toLowerCase()) {
      case 'red':
        return '#bd0d56';
      case 'green':
        return '#3aab53';
      case 'blue':
        return '#160dbd';
      case 'yellow':
        return '#cbd420';
      default:
        return 'transparent';
    }
  }

  deleteLabel(label: Label) {
    this.boardService.deleteLabel(label.labelId!).subscribe({
      next: () => {
        this.getLabels();
      },
      error: (error: any) => {
        this.errorMessage = 'Error deleting label';
        console.error('Error deleting label:', error);
      }
    });

  }
}
