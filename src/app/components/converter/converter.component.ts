import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs';
import { CurrencyService } from '../../shared/service/currency.service';

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
  currencyList: string[] = this.currencyService.currencyList;

  currencyForm?: FormGroup;
  rates: any = {
    USD: { buy: 0, sale: 0 },
    EUR: { buy: 0, sale: 0 },
    BTC: { buy: 0, sale: 0 },
  };

  ngOnInit() {
    this.currencyService
      .getExchangeRate()
      .pipe(first())
      .subscribe((data) => {
        //console.log(data);

        data.forEach((e: any) => {
          this.rates[e.ccy].buy = e.buy;
          this.rates[e.ccy].sale = e.sale;
        });
        console.log(this.rates);

        // this.rates.USD = data[0].buy;
        // this.rates.EUR = data[1].buy;
        // this.rates.BTC = data[2].buy * data[0].buy;

        this.currencyForm?.patchValue({
          secondInput: [Number(data[0].buy).toFixed(2)],
        });
      });
    this.initForm();
  }
  initForm() {
    this.currencyForm = this.formBuilder.group({
      firstInput: [1],
      firstSelect: ['USD'],
      secondInput: [],
      secondSelect: ['UAH'],
    });
  }
  generateInput(a: number = 1, b: number = 1, c: number = 1): string {
    return Number((a * b) / c).toFixed(2);
  }

  patchSecondInput(input: string) {
    this.currencyForm?.patchValue({ secondInput: input });
  }
  patchFirstInput(input: string) {
    this.currencyForm?.patchValue({ firstInput: input });
  }

  directConversion() {
    const formValue = this.currencyForm?.value;
    if (formValue.secondSelect === 'UAH') {
      this.patchSecondInput(
        this.generateInput(
          formValue.firstInput,
          this.rates[formValue.firstSelect].buy,
          1
        )
      );
    } else {
      this.patchSecondInput(
        this.generateInput(
          formValue.firstInput,
          this.rates[formValue.firstSelect].buy,
          this.rates[formValue.secondSelect].buy
        )
      );
    }

    // if (formValue.secondSelect === 'UAH') {
    //   this.patchSecondInput(
    //     this.generateInput(
    //       formValue.firstInput,
    //       this.rates[formValue.firstSelect].buy
    //     )
    //   );
    // }
    // if (formValue.firstSelect === formValue.secondSelect) {
    //   this.patchSecondInput(formValue.firstInput);
    // }
    // if (formValue.secondSelect !== 'UAH') {
    //   if (formValue.firstSelect === 'UAH') {
    //     this.patchSecondInput(
    //       this.generateInput(
    //         formValue.firstInput,
    //         1,
    //         this.rates[formValue.secondSelect].sale
    //       )
    //     );
    //   } else {
    //     this.patchSecondInput(
    //       this.generateInput(
    //         formValue.firstInput,
    //         this.rates[formValue.firstSelect],
    //         this.rates[formValue.secondSelect]
    //       )
    //     );
    //   }
  }

  reverseConversion() {
    const formValue = this.currencyForm?.value;

    if (formValue.firstSelect === 'UAH') {
      this.patchFirstInput(
        this.generateInput(
          formValue.secondInput,
          this.rates[formValue.secondSelect].sale
        )
      );
    }
    if (formValue.firstSelect === formValue.secondSelect) {
      this.patchFirstInput(formValue.firstInput);
    }
    if (formValue.firstSelect !== 'UAH') {
      if (formValue.secondSelect === 'UAH') {
        this.patchFirstInput(
          this.generateInput(
            formValue.secondInput,
            1,
            this.rates[formValue.firstSelect]
          )
        );
      } else {
        this.patchFirstInput(
          this.generateInput(
            formValue.secondInput,
            this.rates[formValue.secondSelect],
            this.rates[formValue.firstSelect]
          )
        );
      }
    }
  }

  inverseCurrency() {
    const firstSelect = this.currencyForm?.get('firstSelect')?.value;
    const secondSelect = this.currencyForm?.get('secondSelect')?.value;
    this.currencyForm?.patchValue({
      firstSelect: secondSelect,
      secondSelect: firstSelect,
    });
    this.directConversion();
  }
}
