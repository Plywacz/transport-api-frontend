import {Component, OnInit} from '@angular/core';
import {DriverService} from '../../services/driver/driver.service';
import {AlertService} from '../../services/alert/alert.service';
import {Driver} from '../../models/driver';
import {ActivatedRoute, Router} from '@angular/router';
import {TransitService} from '../../services/transit/transit.service';

@Component({
  selector: 'app-driver-list',
  templateUrl: './display-driver.component.html',
  styleUrls: ['./display-driver.component.css']
})
//todo: sort transits by date
export class DisplayDriverComponent implements OnInit {
  driver: Driver;

  constructor(private driverService: DriverService,
              private transitService: TransitService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const driverId = this.route.snapshot.params.id;
    this.alertService.wait('Operation in progress');

    this.driverService.getDriver(driverId)
      .subscribe(data => {
          this.driver = data;
          this.alertService.clear();
        },
        error => {
          const msg = ` ` + error.error.message || error.error || 'unknown Error';
          this.router.navigate(['get-driver']);
          this.alertService.error('Cannot display this driver due to: ' + msg);
        });
  }

  deleteRow(transitId: number) {
    if (confirm('Are you sure you want to delete this transit ???')) {
      this.alertService.wait('Operation in progress');

      this.transitService.deleteTransit(transitId)
        .subscribe(succes => {
            window.location.reload();
          },
          error => {
            let msg = ' ' + error.error.message || error.error || 'unknown message';
            this.alertService.error('Operation failed due to: ' + msg);
          });
    }
  }
}
