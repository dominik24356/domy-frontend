import {Component, OnInit} from '@angular/core';
import {Board} from "../../models/board";
import {BoardService} from "../../services/board.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Task} from "../../models/task";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskList} from "../../models/task-list";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boardId: number = 0;
  public board: Board = new Board();

  // add task list form
  showAddTaskListForm = false;
  addTaskListForm: FormGroup;

  // add task form
  isAddTaskButtonHidden: boolean[] = [];
  addTaskForm: FormGroup;
  currentOpenFormIndex: number | null = null;

  // task modal
  selectedTask: Task | undefined = undefined;
  isTaskModalOpen: boolean = false;

  // change board title
  showChangeBoardTitleAlert: boolean = false;

  // delete task list
  public showDeleteTaskListAlert = false;
  taskListToDeleteId: number | undefined;
  taskListToDeleteName: string | undefined;

  // delete board
  showDeleteBoardAlert: boolean = false;

  constructor(
    private boardService: BoardService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.addTaskListForm = this.fb.group({
      taskListName: ['', Validators.required]
    });

    this.addTaskForm = this.fb.group({
      taskName: ['', Validators.required],
    });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.boardId = params['boardId'];
      this.getUserBoard();
    });
  }

  getUserBoard(): void {
    this.boardService.getUserBoard(this.boardId).subscribe((board: Board) => {
      this.board = board;
    });
  }

  deleteTaskList(taskList: TaskList): void {
    this.taskListToDeleteId = taskList.listId;
    this.taskListToDeleteName = taskList.listName;
    this.showDeleteTaskListAlert = true;
  }

  confirmDeleteTaskList(): void {
    if (this.taskListToDeleteId !== undefined) {
      this.boardService.deleteTaskList(this.taskListToDeleteId).subscribe(() => {
        this.getUserBoard();
        this.showDeleteTaskListAlert = false;
        this.taskListToDeleteId = undefined;
        this.taskListToDeleteName = undefined;
      });
    }
  }

  cancelDeleteTaskList(): void {
    this.showDeleteTaskListAlert = false;
    this.taskListToDeleteId = undefined;
    this.taskListToDeleteName = undefined;
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
  }

  closeTaskModal(): void {
    this.selectedTask = undefined;
    this.isTaskModalOpen = false;
    this.getUserBoard();
  }


  handleEditClick() {
    this.showChangeBoardTitleAlert = true;
  }

  handleDeleteClick() {
    this.showDeleteBoardAlert = true;
  }


  handleCancelEditBoardTitle() {
    this.showChangeBoardTitleAlert = false;
  }

  confirmDeleteBoard() {
    this.showDeleteBoardAlert = false;
    this.router.navigate(['/main-panel']);
  }

  cancelDeleteBoard() {
    this.showDeleteBoardAlert = false;
  }


}
