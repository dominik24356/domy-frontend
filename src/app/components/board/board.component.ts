import {Component, OnInit} from '@angular/core';
import {Board} from "../../models/board";
import {BoardService} from "../../services/board.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boardId = 1; // Id tablicy, którą chcesz pobrać
  board: Board = new Board();

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
    if (confirm('Are you sure you want to delete this task list?')) {
      this.boardService.deleteTaskList(taskListId).subscribe(() => {
        // Fetch the updated task lists from the server
        this.getUserBoard();
      });
    }
  }
}
