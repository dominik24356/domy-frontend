import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Board} from "../models/board";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getUserBoard(boardId: number): Observable<Board> {
    const url = `${this.apiUrl}/boards/${boardId}`;
    return this.http.get<Board>(url);
  }


  deleteTaskList(taskListId: number): Observable<any> {
    const url = `${this.apiUrl}/task-lists/${taskListId}`;
    return this.http.delete(url);
  }

  addTaskList(listTitle: string, boardId: number): Observable<any> {
    const url = `${this.apiUrl}/task-lists`;
    const data = {
      listTitle: listTitle,
      boardId: boardId
    };
    return this.http.post(url, data);
  }

  addTask(listId: number, newTaskName: string) : Observable<any> {
    const url = `${this.apiUrl}/tasks`;
    const data = {
      taskName: newTaskName,
      listId: listId
    };
    return this.http.post(url, data);

  }


}
