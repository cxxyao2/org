import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

import { AlertService } from '@app/services';

@Component({
  selector: 'org-alert',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  alert: any;

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.subscription = this.alertService.onAlert().subscribe((alert) => {
      switch (alert && alert.type) {
        case 'success':
          alert.cssClass = 'alert alert-success';
          break;
        case 'error':
          alert.cssClass = 'alert alert-danger';
          break;
      }

      this.alert = alert;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
