import {Component, OnInit} from '@angular/core';
import {Board} from "../../models/board";
import {BoardService} from "../../services/board.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../models/task";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boardId = 1;
  board: Board = new Board();
  public showDeleteTaskListAlert = false;
  taskListToDeleteId: number | undefined;
  showAddTaskListForm = false;
  addTaskListForm: FormGroup;
  isAddTaskButtonHidden: boolean[] = [];
  addTaskForm: FormGroup;
  currentOpenFormIndex: number | null = null;
  selectedTask: Task | undefined = undefined;
  isOverlayVisible: boolean = false;
  isTaskModalOpen: boolean = false;

  constructor(
    private boardService: BoardService,
    private fb: FormBuilder
  ) {
    this.addTaskListForm = this.fb.group({
      taskListName: ['', Validators.required]
    });

    this.addTaskForm = this.fb.group({
      taskName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getUserBoard();
  }

  getUserBoard(): void {
    this.boardService.getUserBoard(this.boardId).subscribe((board: Board) => {
      this.board = board;
    });
  }

  deleteTaskList(taskListId: number): void {
    this.taskListToDeleteId = taskListId;
    this.showDeleteTaskListAlert = true;
    this.isOverlayVisible = true;
  }

  confirmDeleteTaskList(): void {
    if (this.taskListToDeleteId !== undefined) {
      this.boardService.deleteTaskList(this.taskListToDeleteId).subscribe(() => {
        this.getUserBoard();
        this.showDeleteTaskListAlert = false;
        this.taskListToDeleteId = undefined;
        this.isOverlayVisible = false;
      });
    }
  }

  cancelDeleteTaskList(): void {
    this.showDeleteTaskListAlert = false;
    this.taskListToDeleteId = undefined;
    this.isOverlayVisible = false;
  }

  showAddTaskList(): void {
    this.showAddTaskListForm = true;
  }

  cancelAddTaskList(): void {
    this.showAddTaskListForm = false;
    this.addTaskListForm.reset();
  }

  createTaskList(): void {
    const title = this.addTaskListForm.get('taskListName')?.value;
    this.boardService.addTaskList(title, this.boardId).subscribe(() => {
      this.getUserBoard();
      this.cancelAddTaskList();
    });
  }

  showAddTaskForm(index: number): void {
    if (this.currentOpenFormIndex !== null) {
      this.isAddTaskButtonHidden[this.currentOpenFormIndex] = false;
    }
    this.currentOpenFormIndex = index;
    this.isAddTaskButtonHidden[index] = true;
  }

  cancelAddTaskForm(index: number): void {
    this.currentOpenFormIndex = null;
    this.isAddTaskButtonHidden[index] = false;
    this.addTaskForm.reset();
  }

  addTask(index: number): void {
    // @ts-ignore
    const listId: number = this.board.taskLists[index].listId;
    const newTaskName = this.addTaskForm.get('taskName')?.value;
    this.boardService.addTask(listId, newTaskName).subscribe(() => {
      this.cancelAddTaskForm(index);
      this.getUserBoard();
    });
  }

  openTaskModal(task: Task): void {
    this.selectedTask = task;
    this.isTaskModalOpen = true;
    this.isOverlayVisible = true;
  }

  closeTaskModal(): void {
    this.selectedTask = undefined;
    this.isTaskModalOpen = false;
    this.isOverlayVisible = false;
  }
}
