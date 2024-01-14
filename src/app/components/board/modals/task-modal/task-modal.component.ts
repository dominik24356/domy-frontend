import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {Attachment, LabelColor, Task} from "../../../../models/task";
import {last} from "rxjs";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements AfterViewInit {
  @Input() showModal: boolean = false;
  @Input() task: Task | undefined;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  protected readonly last = last;
  isEditingDescription: boolean = false;
  editedDescription: string = '';

  @ViewChild('readableDescription') readableDescription: ElementRef | undefined;
  @ViewChild('editableDescription') editableDescription: ElementRef | undefined;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.adjustTextareaHeight();
  }


  getLabelColor(color: LabelColor | undefined): string {
    switch (color) {
      case LabelColor.RED:
        return '#bd0d56'; // Red
      case LabelColor.BLUE:
        return '#160dbd'; // Blue
      case LabelColor.GREEN:
        return '#3aab53'; // Green
      case LabelColor.YELLOW:
        return '#cbd420'; // Yellow
      default:
        return '#FFFFFF'; // Default color (white)
    }
  }

  openAttachmentLink(attachment: Attachment): void {
    if (attachment.link) {
      // Check if a link exists
      window.open(attachment.link, '_blank'); // Open link in a new tab/window
    }
  }

  startEditingDescription(): void {
    // Zczytaj odpowiednie wysokości
    const readableHeight = this.readableDescription?.nativeElement.offsetHeight || 0;
    const editableHeight = this.editableDescription?.nativeElement.scrollHeight || 0;

    // Ustaw zmienne
    this.isEditingDescription = true;
    this.editedDescription = this.task?.description || '';

    this.cdr.detectChanges();

    // Przypisz odpowiednie wysokości
    if (this.editableDescription) {
      this.editableDescription.nativeElement.style.height = `${Math.max(readableHeight, editableHeight)}px`;
    }
  }

  adjustTextareaHeight(): void {
    // Dostosuj wysokość textarea do zawartości
    if (this.editableDescription) {
      this.editableDescription.nativeElement.style.height = 'auto';
      this.editableDescription.nativeElement.style.height = `${this.editableDescription.nativeElement.scrollHeight}px`;
    }
  }

  saveDescription(): void {
    if (this.task && this.isEditingDescription) {
      this.task.description = this.editedDescription;
      // Wysyłanie zapytania do backendu w celu zapisania zmiany
      // Tutaj możesz użyć odpowiedniej metody lub serwisu do wysłania danych do backendu
    }
    this.isEditingDescription = false;
  }

  cancelEditingDescription(): void {
    this.isEditingDescription = false;
  }

}
