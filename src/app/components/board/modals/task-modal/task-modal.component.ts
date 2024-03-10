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
import {Attachment, Comment, Label, LabelColor, Task, TaskStatus} from "../../../../models/task";
import {last, Observable, switchMap, tap, throwError} from "rxjs";
import {BoardService} from "../../../../services/board.service";
import {Board} from "../../../../models/board";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements AfterViewInit {
  @Input() boardId!: number;
  @Input() showModal: boolean = false;
  @Input() task: Task | undefined;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  protected readonly last = last;
  isEditingDescription: boolean = false;
  editedDescription: string = '';

  @ViewChild('readableDescription') readableDescription: ElementRef | undefined;
  @ViewChild('editableDescription') editableDescription: ElementRef | undefined;
  showAddLabelPopover: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private boardService: BoardService) {}


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

      window.open(attachment.link, '_blank'); // Open link in a new tab/window
    }
  }

  startEditingDescription(): void {

    const readableHeight = this.readableDescription?.nativeElement.offsetHeight || 0;
    const editableHeight = this.editableDescription?.nativeElement.scrollHeight || 0;


    this.isEditingDescription = true;
    this.editedDescription = this.task?.description || '';

    this.cdr.detectChanges();


    if (this.editableDescription) {
      this.editableDescription.nativeElement.style.height = `${Math.max(readableHeight, editableHeight)}px`;
    }
  }

  saveDescription(): void {
    if (this.task && this.isEditingDescription) {
      const originalDescription = this.task.description;
      this.task.description = this.editedDescription;

      this.updateTask().subscribe(
        (board: Board) => {
          this.cancelEditingDescription();
        },
        error => {
          console.error('Error updating task:', error);

          // @ts-ignore
          this.task.description = originalDescription;
          this.cdr.detectChanges();

        }
      );
    }
  }

  cancelEditingDescription(): void {
    this.isEditingDescription = false;
  }

  adjustTextareaHeight(): void {
    if (this.editableDescription) {
      this.editableDescription.nativeElement.style.height = 'auto';
      this.editableDescription.nativeElement.style.height = `${this.editableDescription.nativeElement.scrollHeight}px`;
    }
  }

  private updateTask(): Observable<Board> {

    if (this.task) {
      const { taskName, description, dueDate, status } = this.task;

      return this.boardService.updateTask(this.task.taskId, { taskName, description, dueDate, status }).pipe(
        switchMap(() => this.boardService.getUserBoard(this.boardId)),
        tap((board: Board) => {
          if (board && board.taskLists) {
            const updatedTask = board.taskLists
              .flatMap(list => list.tasks)
              .find(t => t && t.taskId === this.task?.taskId);

            if (updatedTask) {
              this.task = updatedTask;
              this.cdr.detectChanges();
            }
          }
        })
      );
    }

    return throwError('Task is not defined.');
  }



  openLabelsDialog() {
    this.showAddLabelPopover = true;
  }

  hanldeAddLabel() {
    this.showAddLabelPopover = false;
  }
}







