import {Component} from '@angular/core';
import {User} from './models/user';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Transport App';

  currentUser: User;

  constructor(private router: Router,
              private authenticationService: UserService) {
    this.authenticationService.currentUser.subscribe(value => this.currentUser = value);
  }

  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['login']);
  }
}
