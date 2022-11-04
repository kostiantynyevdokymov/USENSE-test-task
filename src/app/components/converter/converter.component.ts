import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { CurrencyService } from '../currency.service';
@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  constructor(
    private currencyService: CurrencyService,
    private formBuilder: FormBuilder
  ) {}
  currency: string[] = this.currencyService.currency;
  rate: any;
  firstInput: any;
  secondInput: any;
  currencyForm?: FormGroup;
  rates: any = { USD: 0, EUR: 0 };

  ngOnInit() {
    this.currencyService
      .getExchangeRate()
      .pipe(first())
      .subscribe((data) => {
        this.rate = data;
        this.rates.EUR = this.rate[0].buy;
        this.rates.USD = this.rate[1].buy;

        this.currencyForm?.patchValue({
          secondInput: [Number(data[0].buy).toFixed(2)],
        });
      });
    this.formCreate();
  }
  formCreate() {
    console.log(this.rate);
    this.currencyForm = this.formBuilder.group({
      firstInput: [1],
      firstSelect: ['USD'],
      secondInput: [],
      secondSelect: ['UAH'],
    });
  }

  directConversion() {
    if (this.currencyForm?.value.secondSelect === 'UAH') {
      this.currencyForm.patchValue({
        secondInput: [
          Number(
            this.currencyForm.value.firstInput *
              this.rates[this.currencyForm?.value.firstSelect]
          ).toFixed(2),
        ],
      });
    }
    if (
      this.currencyForm?.value.firstSelect ===
      this.currencyForm?.value.secondSelect
    ) {
      this.currencyForm?.patchValue({
        secondInput: [this.currencyForm.value.firstInput],
      });
    }
    if (this.currencyForm?.value.secondSelect !== 'UAH') {
      if (this.currencyForm?.value.firstSelect === 'UAH') {
        this.currencyForm?.patchValue({
          secondInput: [
            Number(
              this.currencyForm.value.firstInput /
                this.rates[this.currencyForm?.value.secondSelect]
            ).toFixed(2),
          ],
        });
      } else {
        this.currencyForm?.patchValue({
          secondInput: [
            Number(
              (this.currencyForm.value.firstInput *
                this.rates[this.currencyForm?.value.firstSelect]) /
                this.rates[this.currencyForm?.value.secondSelect]
            ).toFixed(2),
          ],
        });
      }
    }
  }

  reverseConversion() {
    if (this.currencyForm?.value.firstSelect === 'UAH') {
      this.currencyForm.patchValue({
        firstInput: [
          Number(
            this.currencyForm.value.secondInput *
              this.rates[this.currencyForm?.value.secondSelect]
          ).toFixed(2),
        ],
      });
    }
    if (
      this.currencyForm?.value.firstSelect ===
      this.currencyForm?.value.secondSelect
    ) {
      this.currencyForm?.patchValue({
        firstInput: [this.currencyForm.value.secondInput],
      });
    }
    if (this.currencyForm?.value.firstSelect !== 'UAH') {
      if (this.currencyForm?.value.secondSelect === 'UAH') {
        this.currencyForm?.patchValue({
          firstInput: [
            Number(
              this.currencyForm.value.secondInput /
                this.rates[this.currencyForm?.value.firstSelect]
            ).toFixed(2),
          ],
        });
      } else {
        this.currencyForm?.patchValue({
          firstInput: [
            Number(
              (this.currencyForm.value.secondInput *
                this.rates[this.currencyForm?.value.secondSelect]) /
                this.rates[this.currencyForm?.value.firstSelect]
            ).toFixed(2),
          ],
        });
      }
    }
  }
  inverseCurrency() {
    this.currencyForm?.patchValue({
      firstInput: [this.currencyForm?.value.secondInput],
    });
    this.directConversion();
  }
}
