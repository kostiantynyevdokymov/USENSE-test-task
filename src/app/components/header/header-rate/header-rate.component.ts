import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-rate',
  templateUrl: './header-rate.component.html',
  styleUrls: ['./header-rate.component.scss'],
})
export class HeaderRateComponent implements OnInit {
  @Input() currency: any;
  @Input() img: any;
  constructor() {}
  ngOnInit() {}
}
