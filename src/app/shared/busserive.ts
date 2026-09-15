import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Bus, Buses } from './Bus';


@Injectable({
  providedIn: 'root',
})
export class Busserive {
  private readonly apiUrl = 'http://localhost:8080/mybuses';

  constructor(private http: HttpClient) {}

  getBuses(from: string, to: string, page: number, pageSize: number): Observable<Buses> {
    return this.http
      .get<Buses>(this.apiUrl + `?from=${from}&to=${to}&page=${page}&size=${pageSize}`, { observe: 'response' })
      .pipe(
        map((response) => ({
          ...(response.body ?? { buses: [], totalRecords: 0 }),
          success: response.headers.get('success') === 'true',
        }))
      );
  }

  getBusesByFilter(from: string, to: string, page: number, pageSize: number): Observable<Buses> {
    return this.getBuses(from, to, page, pageSize);
  }
}
