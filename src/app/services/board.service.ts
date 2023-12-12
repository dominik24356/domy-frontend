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

  // Możesz dodać inne metody, takie jak dodawanie, usuwanie, aktualizowanie itp.
}
