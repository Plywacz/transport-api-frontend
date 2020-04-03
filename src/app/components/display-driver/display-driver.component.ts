import {Component, OnInit} from '@angular/core';
import {DriverService} from '../../services/driver/driver.service';
import {AlertService} from '../../services/alert/alert.service';
import {Driver} from '../../models/driver';
import {ActivatedRoute, Router} from '@angular/router';
import {TransitService} from '../../services/transit/transit.service';
import {DriverReport} from '../../models/driver-report';

@Component({
  selector: 'app-driver-list',
  templateUrl: './display-driver.component.html',
  styleUrls: ['./display-driver.component.css']
})
//todo: sort transits by date
export class DisplayDriverComponent implements OnInit {
  driver: Driver;

  showReport: boolean = false;
  driverReport: DriverReport;

  constructor(private driverService: DriverService,
              private transitService: TransitService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.driverReport = null; // when this page is reloaded driverReport is set to null,
    // so that after reloading if user clicks get driver report he gets fresh report !

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

  showDriverInfo() {
    if (!this.driverReport) {
      this.fetchDriverReport();
    } else {
      this.showReport = !this.showReport;
    }
  }

  private fetchDriverReport(): void {
    this.alertService.wait('Fetching driver report...');

    this.driverService.getDriverReport(this.driver.id)
      .subscribe(
        data => {
          this.driverReport = data;
          this.alertService.clear();
          this.showReport = true;
        },
        error => {
          let msg = ' ' + error.error.message || error.error || 'unknown error';
          this.alertService.error(msg);
        }
      );
  }
}

