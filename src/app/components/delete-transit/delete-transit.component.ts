import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TransitService} from '../../services/transit/transit.service';
import {AlertService} from '../../services/alert/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delete-transit',
  templateUrl: './delete-transit.component.html',
  styleUrls: ['./delete-transit.component.css']
})
export class DeleteTransitComponent implements OnInit {
  deleteTransitForm: FormGroup;

  constructor(private fb: FormBuilder,
              private transitService: TransitService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.deleteTransitForm = this.generateForm();
  }

  private generateForm() {
    return this.fb.group({
      transitId: ['', [Validators.required, Validators.min(3)]],
    });
  }

  onSubmit() {
    if (confirm('Are you sure you want to delete this transit?')) {
      this.transitService.deleteTransit(this.transitId.value)
        .subscribe(success => {
            this.alertService.success('Successfully deleted');
          },
          error => {
            let msg = error.error.message || error.error || 'unknown error';
            this.alertService.error('Operation failed due to: ' + msg);
          });
    }
  }

  get transitId() {
    return this.deleteTransitForm.get('transitId');
  }

  clearForm() {
    this.deleteTransitForm.reset();
  }
}
