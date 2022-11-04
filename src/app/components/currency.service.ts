import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/service/api.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private apiService: ApiService) {}
  currency: string[] = ['UAH'];
  getExchangeRate(): Observable<any> {
    return this.apiService.get();
  }
}
