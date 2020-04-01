import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user/user.service';
import {AlertService} from '../../services/alert/alert.service';
import {Driver} from '../../models/driver';
import {DriverService} from '../../services/driver/driver.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  drivers: Driver[];

  constructor(private  authenticationService: UserService,
              private alertService: AlertService,
              private driverService: DriverService,
              private router: Router) {
    this.currentUser = authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.alertService.wait('Loading all drivers... ');

    this.driverService.getAllDrivers()
      .subscribe(data => {
          this.drivers = data;
          this.alertService.clear();
        },
        error => {
          let msg = ' ' + error.error.message || 'Server doesn\'t work - try later';
          this.alertService.error(msg);
        });
  }

  displayDriver(id: number) {
    this.router.navigate(['display-driver/' + id]);
  }

  deleteDriver(id: number) {
    if (confirm('Are you sure you want to delete this driver ???')) {
      this.alertService.wait('Deletion in progress');

      this.driverService.deleteDriver(id)
        .subscribe(success => window.location.reload(),
          error => {
            let msg = ' ' + error.error.message || error.error || 'unknown message';
            this.alertService.error('Operation failed due to: ' + msg);
          });
    }
  }

}
