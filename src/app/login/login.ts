import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    console.log('Login submitted', {
      email: this.email,
      password: this.password
    });

    this.router.navigate(['/homepage']);
  }
}
