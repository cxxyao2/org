import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/services';
import { User } from '@app/models';

@Component({
  selector: 'org-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  users?: any[];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService
      .getAll()
      .pipe(first())
      .subscribe((users) => (this.users = users));
  }

  deleteUser(id: string) {
    const user = this.users?.find((x) => x.id === id);
    if (!user) return;
    user.isDeleting = true;
    this.accountService
      .delete(id)
      .pipe(first())
      .subscribe(() => (this.users = this.users?.filter((x) => x.id !== id)));
  }

  userTrackBy(index: number, user: User) {
    return user.id;
  }
}
