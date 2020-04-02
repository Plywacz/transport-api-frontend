import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from '../../services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  message: { cssClass: string, text: string };
  private subscription: Subscription;

  constructor(private alertService: AlertService) {

  }

  ngOnInit(): void {
    // subscription- registers subscription for alerts  once on alert component init
    //subscriptions receives notification automatically when there is new alert and fires below func
    this.subscription = this.alertService.getAlert()
      .subscribe(message => { // if there is new message do what is typed below
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success mt-2';
            this.hideAlertAfter(8000);
            break;
          case 'error':
            message.cssClass = 'alert alert-danger mt-2';
            this.hideAlertAfter(8000);
            break;
          case 'wait':
            message.cssClass = 'alert alert-primary mt-2';
            this.hideAlertAfter(8000);
        }
        this.message = message;
      });
  }

  private hideAlertAfter(mills: number): void {
    const self = this;
    setTimeout(() => {
      // self.message.cssClass = 'none';
      // self.message.text = '';
      this.alertService.clear();
    }, mills);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  hideAlert() {
    this.alertService.clear();
  }
}
