import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [FormsModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  email = '';
  password = '';
    
  constructor(public router: Router) {}

  onSubmit(): void {
    console.log('Login submitted', {
      email: this.email,
      password: this.password
    });

    this.router.navigate(['/homepage']);
  }
}