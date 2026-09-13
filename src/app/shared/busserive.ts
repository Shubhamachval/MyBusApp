import { Injectable } from '@angular/core';
import { Bus } from './Bus';

@Injectable({
  providedIn: 'root',
})
export class Busserive {
  private buses: Bus[] = Array.from({ length: 500 }, (_, index) => {
    const routes = [
      { from: 'Delhi', to: 'Jaipur' },
      { from: 'Delhi', to: 'Agra' },
      { from: 'Jaipur', to: 'Udaipur' },
      { from: 'Lucknow', to: 'Kanpur' },
      { from: 'Mumbai', to: 'Pune' },
      { from: 'Bengaluru', to: 'Chennai' },
      { from: 'Hyderabad', to: 'Vijayawada' },
      { from: 'Ahmedabad', to: 'Surat' },
      { from: 'Kolkata', to: 'Durgapur' },
      { from: 'Patna', to: 'Gaya' }
    ];

    const route = routes[index % routes.length];
    const status: Bus['status'] = index % 3 === 0 ? 'Not Available' : 'Available';

    return {
      id: 100 + index + 1,
      name: `Bus ${index + 1}`,
      from: route.from,
      to: route.to,
      status
    };
  });

  getBuses(): Bus[] {
    return this.buses;
  }

  getFilteredBusCount(from: string, to: string): number {
    return this.buses.filter(bus => bus.from.toUpperCase() === from.toUpperCase() && bus.to.toUpperCase() === to.toUpperCase()).length;
  }

  getBusesByFilter(from: string, to: string, page: number = 1, pageSize: number = 9): Bus[] {
    const filteredBuses = this.buses.filter(bus => bus.from.toUpperCase() === from.toUpperCase() && bus.to.toUpperCase() === to.toUpperCase());
    const startIndex = (page - 1) * pageSize;
    return filteredBuses.slice(startIndex, startIndex + pageSize);
  }
}
