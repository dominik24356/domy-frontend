import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user = {
    username: '',
    email: '',
    password: '' // Ukrywamy hasło
  };

  isEditingPassword = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfo().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        console.error('Failed to get user info', error);
      }
    });
    }


  toggleEditPassword() {
    this.isEditingPassword = !this.isEditingPassword;
  }

  saveNewPassword(newPassword: string) {
    // Tutaj możesz zaimplementować logikę zmiany hasła, np. wywołując odpowiedni serwis
    console.log('Nowe hasło:', newPassword);
    // Przykładowa implementacja - wyślij żądanie do serwera zmiany hasła
  }


}
