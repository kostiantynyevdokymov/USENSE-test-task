import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { CurrencyService } from '../currency.service';
import { Rate } from 'src/app/shared/interface/rate';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  usd?: Rate;
  eur?: Rate;
  constructor(private currencyService: CurrencyService) {}
  ngOnInit() {
    this.currencyService
      .getExchangeRate()
      .pipe(first())
      .subscribe((rates) => {
        console.log(rates);

        rates.forEach((rate: any) => {
          this.currencyService.currency.push(rate.ccy);
          if (rate.ccy === 'EUR') {
            this.eur = {
              buy: Number(rate.buy).toFixed(2),
              sale: Number(rate.sale).toFixed(2),
            };
          }
          if (rate.ccy === 'USD') {
            this.usd = {
              buy: Number(rate.buy).toFixed(2),
              sale: Number(rate.sale).toFixed(2),
            };
          }
        });
      });
  }
}
