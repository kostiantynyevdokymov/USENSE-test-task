import { Component } from '@angular/core';
import { LoadingService } from './shared/service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private loader: LoadingService) {}
  loading$ = this.loader.loading$;
  title = 'USENSE-test-task';
}
