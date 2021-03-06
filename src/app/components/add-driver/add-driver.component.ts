import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DriverService} from '../../services/driver/driver.service';
import {AlertService} from '../../services/alert/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
  addDriverForm: FormGroup;

  constructor(private fb: FormBuilder,
              private driverService: DriverService,
              private alertService: AlertService,
              private router: Router) { //todo after driver is added, route to  get api/divers/{id of this driver}, then alert service may be not necessary
  }

  ngOnInit(): void {
    this.addDriverForm = this.generateForm();
  }

  private generateForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.alertService.wait('Adding driver in progress...');

    this.driverService.addDriver(this.firstName.value, this.lastName.value)
      .subscribe(data => {
         this.router.navigate(['display-driver/'+data.id]);
        },
        error => {
          let msg = 'Operation failed due to: ';
          msg += (error.error.message || error.error);
          this.alertService.error(msg);
        });
    this.clearForm();
  }

  get firstName(): AbstractControl {
    return this.addDriverForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.addDriverForm.get('lastName');
  }

  clearForm() {
    this.addDriverForm.reset();
  }
}
