import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  register(username: string, email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/public/users`;
    const data = {
      username: username,
      email: email,
      password: password
    };
    const headers = this.authService.createAuthorizationHeader();
    return this.http.post(url, data, {headers});
  }


  // method to get user info and return user model
  getUserInfo(): Observable<any> {
    const url = `${this.apiUrl}/users`;
    const headers = this.authService.createAuthorizationHeader();
    return this.http.get(url, {headers});
  }



}
