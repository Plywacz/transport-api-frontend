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
    // subscription- if there is new alert handle it
    this.subscription = this.alertService.getAlert()
      .subscribe(message => { // if there is new message do what is typed below
        switch (message && message.type) {
          case 'success':
            message.cssClass = 'alert alert-success';
            this.hideAlert(7000);
            break;
          case 'error':
            message.cssClass = 'alert alert-danger';
            this.hideAlert(4000);
            break;
          case 'wait':
            message.cssClass = 'alert alert-primary';
        }
        this.message = message;
      });
    // turn off alert after some time
  }

  hideAlert(mills: number): void {
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

}
