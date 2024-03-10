import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import { Board } from "../models/board";
import {LabelColor, Task} from "../models/task";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) {
  }


  getUserBoard(boardId: number): Observable<Board> {
    const url = `${this.apiUrl}/boards/${boardId}`;
    const headers = this.authService.createAuthorizationHeader();
    return this.http.get<Board>(url, {headers});
  }

  createBoard(boardName: string): Observable<any> {
    const url = `${this.apiUrl}/boards`;
    const data = {
      boardName: boardName
    };

    const headers = this.authService.createAuthorizationHeader();

    return this.http.post(url, data, {headers});
  }

  // not ended yet
  deleteBoard(boardId: number): Observable<any> {
    const url = `${this.apiUrl}/boards/${boardId}`;
    const headers = this.authService.createAuthorizationHeader();
    return this.http.delete(url, {headers});
  }

  // getBoardsForUser(userEmail: number): Observable<Board[]> {
  //   const url = `${this.apiUrl}/users/${userEmail}/boards`;
  //   const headers = this.authService.createAuthorizationHeader();
  //   return this.http.get<Board[]>(url, { headers });
  // }

  getAllBoardsForUser(): Observable<Board[]> {
    const url = `${this.apiUrl}/boards`;
    const headers = this.authService.createAuthorizationHeader();
    return this.http.get<Board[]>(url, {headers});

  }

  deleteTaskList(taskListId: number): Observable<any> {
    const url = `${this.apiUrl}/task-lists/${taskListId}`;
    const headers = this.authService.createAuthorizationHeader();
    return this.http.delete(url, {headers});
  }

  addTaskList(listName: string, boardId: number): Observable<any> {
    const url = `${this.apiUrl}/boards/${boardId}/task-lists`;
    const data = {
      listName: listName
    };
    const headers = this.authService.createAuthorizationHeader();
    return this.http.post(url, data, {headers});
  }

  addTask(listId: number, newTaskName: string): Observable<any> {
    const url = `${this.apiUrl}/task-lists/${listId}/tasks`;
    const data = {
      taskName: newTaskName
    };
    const headers = this.authService.createAuthorizationHeader();
    return this.http.post(url, data, {headers});
  }

  updateTask(taskId: number | undefined, updateRequest: Task | undefined): Observable<any> {
    const url = `${this.apiUrl}/tasks/${taskId}`;
    const headers = this.authService.createAuthorizationHeader();
    return this.http.put(url, updateRequest, {headers});
  }

  updateBoard(boardId: number, title: string): Observable<any> {
    const url = `${this.apiUrl}/boards/${boardId}`;
    const data = {
      boardName: title
    };
    const headers = this.authService.createAuthorizationHeader();
    return this.http.put(url, data, {headers});

  }


  addLabel(boardId: number, labelName: string, selectedColor: LabelColor.RED | LabelColor.BLUE | LabelColor.GREEN | LabelColor.YELLOW) {
    const url = `${this.apiUrl}/boards/${boardId}/labels`;
    const data = {
      name: labelName,
      color: selectedColor
    };
    const headers = this.authService.createAuthorizationHeader();
    return this.http.post(url, data, {headers});
  }

}
