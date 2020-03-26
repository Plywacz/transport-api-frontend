import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './services/auth/auth-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  { path: '**', redirectTo: '' } //if path doesnt exists redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
