import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  errorMessage: string = '';

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }


  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  register() {
    if (this.signUpForm.invalid) {
      return;
    }

    const { username, email, password } = this.signUpForm.value;

    this.userService.register(username, email, password)
      .subscribe({
        next: response => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Registration failed', err);
          if (err.error && err.error.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = 'Registration failed. Please try again later.';
          }
        }
      });
  }
}
