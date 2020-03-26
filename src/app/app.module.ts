import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './services/user/user.service';

import { AlertComponent } from './components/alert/alert.component';
import {AlertService} from './services/user/alert.service';
import { HomeComponent } from './components/home/home.component';
import {AddDriverComponent} from './components/add-driver/add-driver.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    AlertComponent,
    HomeComponent,
    AddDriverComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
