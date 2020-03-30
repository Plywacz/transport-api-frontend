import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AlertComponent} from './components/alert/alert.component';
import {AlertService} from './services/alert/alert.service';
import {HomeComponent} from './components/home/home.component';
import {AddDriverComponent} from './components/add-driver/add-driver.component';
import {JwtInterceptor} from './authorization/jwt-interceptor';
import { AddTransitComponent } from './components/add-transit/add-transit.component';
import { DeleteDriverComponent } from './components/delete-driver/delete-driver.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    AlertComponent,
    HomeComponent,
    AddDriverComponent,
    AddTransitComponent,
    DeleteDriverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
