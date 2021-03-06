import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert/alert.service';
import {Router} from '@angular/router';
import {TransitService} from '../../services/transit/transit.service';

@Component({
  selector: 'app-add-transit',
  templateUrl: './add-transit.component.html',
  styleUrls: ['./add-transit.component.css']
})
export class AddTransitComponent {
  addTransitFrom: FormGroup;

  constructor(private fb: FormBuilder,
              private transitService: TransitService,
              private alertService: AlertService,
              private router: Router) {
    this.addTransitFrom = this.generateForm();
  }


  private generateForm() {
    return this.fb.group(
      {
        driverId: ['', [Validators.required, Validators.min(0)]],
        sourceAddress: ['', [Validators.required, Validators.minLength(3)]],
        destinationAddress: ['', [Validators.required, Validators.minLength(3)]],
        price: ['', [Validators.required, Validators.min(0)]],
        date: ['', [Validators.required]], //todo validate that given date is before current day
      }
    );
  }

  onSubmit() {
    this.alertService.clear();
    this.alertService.wait('Operation in progress...');

    this.transitService.addTransit({
      driverId: this.driverId.value,
      sourceAddress: this.sourceAddress.value,
      destinationAddress: this.destinationAddress.value,
      price: this.price.value,
      date: this.date.value
    })
      .subscribe(
        transit => {
          this.router.navigate(['display-driver/' + transit.driverId]);
        },
        error => {
          let msg = error.error.message || error.error || 'unknown error';
          this.alertService.error('Operation failed due to: ' + msg);
        }
      );
    this.clearForm();
  }


  clearForm() {
    this.addTransitFrom.reset();
  }

  get driverId() {
    return this.addTransitFrom.get('driverId');
  }

  get sourceAddress() {
    return this.addTransitFrom.get('sourceAddress');
  }

  get destinationAddress() {
    return this.addTransitFrom.get('destinationAddress');
  }

  get price() {
    return this.addTransitFrom.get('price');
  }

  get date() {
    return this.addTransitFrom.get('date');
  }

}
