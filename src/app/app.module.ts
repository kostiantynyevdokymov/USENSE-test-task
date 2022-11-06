import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header-main/header.component';
import { HeaderRateComponent } from './components/header/header-rate/header-rate.component';
import { ConverterComponent } from './components/converter/converter.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { LoaderInterceptorProvider } from './interceptors/loader.interceptor';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConverterComponent,
    HeaderRateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [LoaderInterceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
