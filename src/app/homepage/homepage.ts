import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FooterComponent } from '../common/footer/footer';
import { HeaderComponent } from '../common/header/header';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  imports: [HeaderComponent, FooterComponent,FormsModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  
  fromValue='';
  toValue='';
  dateValue='';

  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['/login']);
  }

  searchButton(): void {

    console.log('Search button clicked in feature branch');
    console.log('From:', this.fromValue);
    console.log('To:', this.toValue);
    console.log('Date:', this.dateValue);
    this.router.navigate(['/main-content'], { queryParams: { from: this.fromValue, to: this.toValue, date: this.dateValue } });
  }

}
