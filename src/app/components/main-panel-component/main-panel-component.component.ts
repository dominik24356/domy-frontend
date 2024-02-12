import {Component, OnInit} from '@angular/core';
import {Board} from "../../models/board";
import {BoardService} from "../../services/board.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-main-panel-component',
  templateUrl: './main-panel-component.component.html',
  styleUrls: ['./main-panel-component.component.css']
})
export class MainPanelComponentComponent implements OnInit{
  boards: Board[] = [];
  errorMessage: string = '';
  showAddBoardForm: boolean = false;
  addBoardForm: FormGroup;

  constructor(
    private boardService: BoardService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.addBoardForm = this.formBuilder.group({
      boardName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadBoards();
  }

  loadBoards(): void {
    this.boardService.getAllBoardsForUser().subscribe({
      next: (boards: Board[]) => {
        this.boards = boards;
      },
      error: (error: any) => {
        this.errorMessage = 'Error loading boards';
        console.error('Error loading boards:', error);
      }
    });
  }

  goToBoard(boardId: number): void {
    this.router.navigate(['/board', boardId]);
  }

  showAddBoard(): void {
    this.showAddBoardForm = true;
  }

  cancelAddBoard(): void {
    this.showAddBoardForm = false;
    this.addBoardForm.reset();
  }

  createBoard(): void {
    if (this.addBoardForm.valid) {
      const boardName = this.addBoardForm.value.boardName;
      this.boardService.createBoard(boardName).subscribe({
        next: () => {
          this.loadBoards();
          this.cancelAddBoard();
        },
        error: (error) => {
          console.error('Error creating board:', error);
        }
      });

    }
  }

  deleteBoard(event: any, boardId: number): void {
    event.stopPropagation();
    this.boardService.deleteBoard(boardId).subscribe({
      next: () => {
        this.loadBoards();
      },
      error: (error) => {
        console.error('Error deleting board:', error);
      }
    });


  }
}
