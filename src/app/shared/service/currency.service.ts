import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private apiService: ApiService) {}
  currencyList: string[] = ['UAH'];
  getExchangeRate(): Observable<any> {
    return this.apiService.get();
  }
}
