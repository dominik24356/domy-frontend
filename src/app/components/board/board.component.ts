import {Component, OnInit} from '@angular/core';
import {Board} from "../../app/models/board";
import {BoardService} from "../../app/services/board.service";

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
}
