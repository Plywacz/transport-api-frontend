import {Component, OnInit} from '@angular/core';
import {DriverService} from '../../services/driver/driver.service';
import {AlertService} from '../../services/alert/alert.service';
import {Driver} from '../../models/driver';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-driver-list',
  templateUrl: './display-driver.component.html',
  styleUrls: ['./display-driver.component.css']
})
export class DisplayDriverComponent implements OnInit {
  driver: Driver;

  constructor(private driverService: DriverService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const driverId = this.route.snapshot.params.id;

    this.driverService.getDriver(driverId)
      .subscribe(data => {
          this.driver = data;
        },
        error => {
          const msg = ` ` + error.error.message || error.error || 'unknown Error';
          this.router.navigate(['get-driver']);
          this.alertService.error('Cannot display this driver due to: ' + msg);
        });
  }

}
