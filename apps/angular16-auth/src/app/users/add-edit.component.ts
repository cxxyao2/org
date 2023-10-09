import { Component, OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AccountService } from '@app/services';

@Component({
  selector: 'org-add-edit',
  standalone: true,
  imports: [NgClass, NgIf, RouterLink, ReactiveFormsModule],
  templateUrl: './add-edit.component.html',
})
export class AddEditComponent {
  form!: FormGroup;
  id!: string;
  title!: string;
  loading = false;
  submitting = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    // if (this.accountService.userValue) {
    //   this.router.navigate(['/']);
    // }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // form with validation rules
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.minLength(6)]],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.submitting = true;
    this.saveUser()
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success(
            this.id ? 'User updated' : 'User added',
            true
          );
          this.router.navigate(['/users']);
        },
        error: (error) => {
          this.alertService.error(error);
          this.submitting = false;
        },
      });
  }

  private saveUser() {
    return this.id
      ? this.accountService.update(this.id, this.form.value)
      : this.accountService.register(this.form.value);
  }
}
