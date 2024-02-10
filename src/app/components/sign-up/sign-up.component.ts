import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  register() {
    // Tutaj dodaj logikę rejestracji, np. wywołaj serwis do wysłania danych rejestracyjnych
    // Możesz użyć wstrzykiwania zależności, aby uzyskać dostęp do usług, np. HTTP

    // Sprawdź, czy hasło i potwierdzenie hasła są takie same
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Tutaj umieść logikę rejestracji, np. wywołanie metody w serwisie do rejestracji użytkownika

    // Po pomyślnej rejestracji możesz wykonać inne operacje, np. przekierowanie do innej strony
  }
}
