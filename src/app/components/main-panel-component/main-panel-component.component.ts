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
  boardToDeleteId: number | undefined;
  boardToDeleteName: string | undefined;
  public showDeleteBoardAlert = false;

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

  startDeletionOfBoard(event: any,board : Board): void {
    event.stopPropagation();
    this.boardToDeleteId = board.boardId;
    this.boardToDeleteName = board.boardName;
    this.showDeleteBoardAlert = true;
  }


  confirmDeleteBoard(): void {
    this.loadBoards()
    this.resetBoardToDelete()
  }

  cancelDeleteBoard(): void {
    this.resetBoardToDelete()
  }

  resetBoardToDelete(): void {
    this.showDeleteBoardAlert = false;
    this.boardToDeleteId = undefined;
    this.boardToDeleteName = undefined;
  }


}
