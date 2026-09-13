import { Component } from '@angular/core';
import { Bus } from '../../shared/Bus';
import { Input } from '@angular/core';

@Component({
  selector: 'app-bus-details',
  imports: [],
  templateUrl: './bus-details.html',
  styleUrl: './bus-details.css',
})
export class BusDetails {
  @Input() busDetail: Bus={
    id: 0,
    name: '',
    from: '',
    to: '' ,
    status: 'Available'};

    

}

