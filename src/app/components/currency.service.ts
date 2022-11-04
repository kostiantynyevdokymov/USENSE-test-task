import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}
  getExchangeRate(): Observable<any> {
    return this.http.get<any>('https://api.monobank.ua/bank/currency');
  }
}
