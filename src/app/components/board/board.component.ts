import {Component, OnInit} from '@angular/core';
import {Board} from "../../models/board";
import {BoardService} from "../../services/board.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boardId = 1;
  board: Board = new Board();
  showDeleteTaskListAlert = false;
  taskListToDeleteId: number | undefined;

  constructor(private boardService: BoardService) {}

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
  }

  confirmDeleteTaskList(): void {
    if (this.taskListToDeleteId !== undefined) {
      this.boardService.deleteTaskList(this.taskListToDeleteId).subscribe(() => {
        this.getUserBoard();
        this.showDeleteTaskListAlert = false;
        this.taskListToDeleteId = undefined;
      });
    }
  }

  cancelDeleteTaskList(): void {
    this.showDeleteTaskListAlert = false;
    this.taskListToDeleteId = undefined;
  }

  addTaskList(): void {
    // Dodaj logikę do dodawania nowej listy z zadaniami
    // Możesz użyć np. modalu lub innej formy interakcji
    console.log('Dodaj nową listę z zadaniami');
  }

}
