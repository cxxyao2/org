import { Component } from '@angular/core';

import { User } from '@app/models';
import { AccountService } from '@app/services';

@Component({
  selector: 'org-home',
  standalone: true,
  templateUrl: './home.component.html',
})
export class HomeComponent {
  user: User | null;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }
}
