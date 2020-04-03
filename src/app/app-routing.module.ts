import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuard} from './authorization/auth-guard.service';
import {AddDriverComponent} from './components/add-driver/add-driver.component';
import {AddTransitComponent} from './components/add-transit/add-transit.component';
import {DeleteDriverComponent} from './components/delete-driver/delete-driver.component';
import {DeleteTransitComponent} from './components/delete-transit/delete-transit.component';
import {DisplayDriverComponent} from './components/display-driver/display-driver.component';
import {GetDriverComponent} from './components/get-driver/get-driver.component';
import {RangeReport} from './models/range-report';
import {ScopeReportComponent} from './components/scope-report/scope-report.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'add-driver', component: AddDriverComponent, canActivate: [AuthGuard]},
  {path: 'display-driver/:id', component: DisplayDriverComponent, canActivate: [AuthGuard]},
  {path: 'get-driver', component: GetDriverComponent, canActivate: [AuthGuard]},
  {path: 'add-transit', component: AddTransitComponent, canActivate: [AuthGuard]},
  {path: 'delete-driver', component: DeleteDriverComponent, canActivate: [AuthGuard]},
  {path: 'delete-transit', component: DeleteTransitComponent, canActivate: [AuthGuard]},
  {path: 'scope-report', component: ScopeReportComponent, canActivate: [AuthGuard]},

  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: ''} //if path doesnt exists redirect to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
