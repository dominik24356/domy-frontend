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
  // create new label output
  @Output() createNewLabel: EventEmitter<void> = new EventEmitter<void>();
  @Input() boardId!: number;
  @Input() taskId!: number;

  constructor(private boardService: BoardService) {

  }

  ngOnInit(): void {
    // get labels form boardservice by boardId
    this.boardService.getLabels(this.boardId).subscribe({
      next: (labels: Label[]) => {
        this.labels = labels;
        this.filteredLabels = [...labels]; // Skopiuj etykiety do tablicy etykiet po zastosowaniu filtru
      },
      error: (error: any) => {
        this.errorMessage = 'Error getting labels';
        console.error('Error getting labels:', error);
      }
    });

  }

  // Filtruj etykiety na podstawie wprowadzonego zapytania wyszukiwania
  filterLabels(): void {
    this.filteredLabels = this.labels.filter(label =>
      label.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  assignToTask(label: Label): void {
    // Logika przypisywania etykiety do zadania
  }

  showCreateNewLabelForm(): void {
    this.createNewLabel.emit();
  }

  saveLabels(): void {
    // Logika zapisywania etykiet
  }

  close() {
    this.closePopover.emit();
  }

  assignOrUnassign(label: Label): void {
    if (label.taskIds && label.taskIds.includes(this.taskId)) {
      console.log('This label is already assigned to this task.');
      // Tutaj możesz wyświetlić odpowiednie powiadomienie dla użytkownika
    } else {
      // Logika przypisywania etykiety do zadania
      console.log('Assigning label to task...');
    }
  }
}
