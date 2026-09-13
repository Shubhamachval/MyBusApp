import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FooterComponent } from '../common/footer/footer';
import { HeaderComponent } from '../common/header/header';
import { FormsModule } from '@angular/forms';
import { UppercaseText } from '../app/uppercase-text';

@Component({
  selector: 'app-homepage',
  imports: [CommonModule, HeaderComponent, FooterComponent, FormsModule, UppercaseText],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  fromValue = '';
  toValue = '';
  dateValue = '';
  cityPattern = '^[A-Za-z ]+$';
  minDate = new Date().toISOString().split('T')[0];

  constructor(private router: Router) {}

  logout(): void {
    this.router.navigate(['/login']);
  }

  searchButton(): void {
    const trimmedFrom = this.fromValue.trim();
    const trimmedTo = this.toValue.trim();
    const trimmedDate = this.dateValue.trim();

    if (!trimmedFrom || !trimmedTo || !trimmedDate) {
      return;
    }

    if (!new RegExp(this.cityPattern).test(trimmedFrom) || !new RegExp(this.cityPattern).test(trimmedTo)) {
      return;
    }

    const selectedDate = new Date(trimmedDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return;
    }

    this.router.navigate(['/main-content'], {
      queryParams: { from: trimmedFrom, to: trimmedTo, date: trimmedDate },
    });
  }
}
