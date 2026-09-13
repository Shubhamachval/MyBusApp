import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  @Input() title = 'MyBus';
  @Input() showLogout = true;
  @Input() logoutLabel = 'Logout';

  @Output() logoutClicked = new EventEmitter<void>();

  onLogout(): void {
    this.logoutClicked.emit();
  }
}
