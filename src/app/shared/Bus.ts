export type BusStatus = 'Available' | 'Not Available';

export interface Bus {
  id: number;
  name: string;
  from: string;
  to: string;
  status: BusStatus;
}

export interface Buses {
    buses: Bus[];
    totalRecords: number;
  success?: boolean;
}