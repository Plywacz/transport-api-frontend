import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DriverService} from '../../services/driver/driver.service';
import {AlertService} from '../../services/alert/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-driver',
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.css']
})
export class DeleteDriverComponent implements OnInit {
  deleteDriverForm: FormGroup;

  constructor(private fb: FormBuilder,
              private driverService: DriverService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.deleteDriverForm = this.generateForm();
  }

  private generateForm() {
    return this.fb.group({
      driverId: ['', [Validators.required, Validators.min(0)]],
    });
  }

  get driverId() {
    return this.deleteDriverForm.get('driverId');
  }

  onSubmit() {
    if (confirm('Are you sure you want to delete this driver?')) {
      this.driverService.deleteDriver(this.driverId.value)
        .subscribe(success => {
            this.alertService.success('Successfully deleted');
          },
          error => {
            let msg = error.error.message || error.error || 'unknown error';
            this.alertService.error('Operation failed due to: ' + msg);
          });
    }
  }

  clearForm() {

  }
}
