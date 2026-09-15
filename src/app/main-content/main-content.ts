import { Component, signal } from '@angular/core';
import { FooterComponent } from '../common/footer/footer';
import { HeaderComponent } from '../common/header/header';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Busserive } from '../shared/busserive';
import { Bus } from '../shared/Bus';
import { BusDetails } from './bus-details/bus-details';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { finalize, timeout } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-main-content',
  imports: [HeaderComponent, FooterComponent, BusDetails, AsyncPipe],
  templateUrl: './main-content.html',
  styleUrl: './main-content.css',
})
export class MainContent {
  fromValue = '';
  toValue = '';
  dateValue = '';

  //busDetails!:Observable<Bus[]>;
  busDetails = signal<Bus[]>([]);
  currentPage = 1;
  pageSize = 9;
  totalRecords = 0;
  loading = signal<boolean>(true);
  apiError = signal<string>('');

  constructor(private busService: Busserive, private router: Router, private route: ActivatedRoute) {
    this.fromValue = this.route.snapshot.queryParams['from'] || '';
    this.toValue = this.route.snapshot.queryParams['to'] || '';
    this.dateValue = this.route.snapshot.queryParams['date'] || '';

  }

  ngOnInit(): void {
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
    this.loading.set(true);
    this.apiError.set('');
    //     //this.busDetails=this.busService.getBuses();
    //     //this.busDetails=toSignal(this.busService.getBusesByFilter(this.fromValue, this.toValue, this.currentPage, this.pageSize),{initialValue:[]});
    // this.busService.getBusesByFilter
    // (this.fromValue, this.toValue, this.currentPage, this.pageSize).
    // subscribe((buses) => {
    //     this.busDetails.set(buses.buses);
    // });

    this.busService
      .getBusesByFilter(this.fromValue, this.toValue, this.currentPage, this.pageSize)
      .subscribe({
        next: (buses) => {
          this.busDetails.set(buses.buses);
          this.loading.set(false);
          this.totalRecords = buses.totalRecords;
        },
        error: () => {
          this.busDetails.set([]);
          this.totalRecords = 0;
          this.apiError.set('Unable to load buses. Please check that the bus API is running.');
        },
      });
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
