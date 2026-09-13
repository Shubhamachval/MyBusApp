import { Component } from '@angular/core';
import { FooterComponent } from '../common/footer/footer';
import { HeaderComponent } from '../common/header/header';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Busserive } from '../shared/busserive';
import { Bus } from '../shared/Bus';
import { BusDetails } from './bus-details/bus-details';

@Component({
  selector: 'app-main-content',
  imports: [HeaderComponent, FooterComponent, BusDetails],
  templateUrl: './main-content.html',
  styleUrl: './main-content.css',
})
export class MainContent {
  fromValue = '';
  toValue = '';
  dateValue = '';

  busDetails: Bus[] = [];
  currentPage = 1;
  pageSize = 9;
  totalRecords = 0;

  constructor(private busService: Busserive, private router: Router, private route: ActivatedRoute) {
    this.fromValue = this.route.snapshot.queryParams['from'] || '';
    this.toValue = this.route.snapshot.queryParams['to'] || '';
    this.dateValue = this.route.snapshot.queryParams['date'] || '';

    this.loadPageData();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalRecords / this.pageSize));
  }

  get startItemIndex(): number {
    return this.totalRecords === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItemIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalRecords);
  }

  loadPageData(): void {
    this.totalRecords = this.busService.getFilteredBusCount(this.fromValue, this.toValue);
    this.busDetails = this.busService.getBusesByFilter(this.fromValue, this.toValue, this.currentPage, this.pageSize);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
      this.loadPageData();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage += 1;
      this.loadPageData();
    }
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
