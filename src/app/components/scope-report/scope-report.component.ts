import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../services/alert/alert.service';
import {TransitService} from '../../services/transit/transit.service';
import {RangeReport} from '../../models/range-report';

@Component({
  selector: 'app-scope-report',
  templateUrl: './scope-report.component.html',
  styleUrls: ['./scope-report.component.css']
})
export class ScopeReportComponent implements OnInit {

  scopeReportForm: FormGroup;
  rangeReport: RangeReport;

  constructor(private fb: FormBuilder,
              private alertService: AlertService,
              private transitService: TransitService) {
    this.rangeReport = null;
  }

  ngOnInit(): void {
    this.scopeReportForm = this.generateForm();
  }

  private generateForm() {
    return this.fb.group({
      startDate: ['', [Validators.required]], //todo validate that dates are before current day or current day
      endDate: ['', Validators.required],
    });
  }

  onSubmit() {
    this.alertService.wait('Operation in progress...');

    this.transitService.getReportRange(this.startDate.value, this.endDate.value)
      .subscribe(data => {
          this.rangeReport = data;
          this.alertService.clear();
        },
        error => {
          let msg = ' ' + error.error.message || error.error || 'unknown error';
          this.alertService.error(msg);
        });
  }

  get startDate() {
    return this.scopeReportForm.get('startDate');
  }

  get endDate() {
    return this.scopeReportForm.get('endDate');
  }

  clearForm() {
    this.scopeReportForm.reset();
  }
}
