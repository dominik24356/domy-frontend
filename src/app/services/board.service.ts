import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Board } from "../models/board";
import { Task } from "../models/task";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private createAuthorizationHeader(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUserBoard(boardId: number): Observable<Board> {
    const url = `${this.apiUrl}/boards/${boardId}`;
    const headers = this.createAuthorizationHeader();
    return this.http.get<Board>(url, { headers });
  }

  deleteTaskList(taskListId: number): Observable<any> {
    const url = `${this.apiUrl}/task-lists/${taskListId}`;
    const headers = this.createAuthorizationHeader();
    return this.http.delete(url, { headers });
  }

  addTaskList(listName: string, boardId: number): Observable<any> {
    const url = `${this.apiUrl}/boards/${boardId}/task-lists`;
    const data = {
      listName: listName
    };
    const headers = this.createAuthorizationHeader();
    return this.http.post(url, data, { headers });
  }

  addTask(listId: number, newTaskName: string): Observable<any> {
    const url = `${this.apiUrl}/task-lists/${listId}/tasks`;
    const data = {
      taskName: newTaskName
    };
    const headers = this.createAuthorizationHeader();
    return this.http.post(url, data, { headers });
  }

  updateTask(taskId: number | undefined, updateRequest: Task): Observable<any> {
    const url = `${this.apiUrl}/tasks/${taskId}`;
    const headers = this.createAuthorizationHeader();
    return this.http.put(url, updateRequest, { headers });
  }
}
