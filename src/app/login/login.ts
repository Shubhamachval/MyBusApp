import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  get emailValid(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email.trim());
  }

  get passwordValid(): boolean {
    if (this.password.length < 8) {
      return false;
    }

    const hasUpperCase = /[A-Z]/.test(this.password);
    const hasNumber = /\d/.test(this.password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(this.password);

    return hasUpperCase && hasNumber && hasSpecialChar;
  }

  isFormValid(): boolean {
    return this.emailValid && this.passwordValid;
  }

  onSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    console.log('Login submitted', {
      email: this.email,
      password: this.password
    });

    this.router.navigate(['/homepage']);
  }
}
