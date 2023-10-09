import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkWithHref, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AccountService } from '@app/services';
import { User } from '@app/models';
import { AlertComponent } from '@app/components';

@Component({
  standalone: true,
  imports: [NgIf,RouterLink,RouterLinkWithHref, RouterLinkActive, RouterOutlet, AlertComponent],
  selector: 'org-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  user?: User | null;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe((x) => (this.user = x));
  }

  logout() {
    this.accountService.logout();
  }
}
