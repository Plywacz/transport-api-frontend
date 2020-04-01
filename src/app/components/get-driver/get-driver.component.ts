import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DriverService} from '../../services/driver/driver.service';
import {AlertService} from '../../services/alert/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-get-driver',
  templateUrl: './get-driver.component.html',
  styleUrls: ['./get-driver.component.css']
})
export class GetDriverComponent implements OnInit {
  getDriverForm: FormGroup;

  constructor(private fb: FormBuilder,
              private driverService: DriverService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getDriverForm = this.generateForm();
  }

  private generateForm() {
    return this.fb.group({
      driverId: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get driverId() {
    return this.getDriverForm.get('driverId');
  }

  onSubmit() {
    this.alertService.clear();

    const driverId = this.driverId.value;
    if (isNaN(driverId)) {
      this.alertService.error('provide positive integer !!!');
      return;
    }
    this.router.navigate(['display-driver/' + driverId]);

  }

  clearForm() {
    this.getDriverForm.reset();
  }
}
