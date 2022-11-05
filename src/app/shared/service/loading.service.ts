import { Injectable } from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private loading = new BehaviorSubject<boolean>(false);
  private loading$ = this.loading.asObservable().pipe(debounceTime(50));
  constructor() {}
  show() {
    this.loading.next(true);
  }
  hide() {
    this.loading.next(false);
  }
}
