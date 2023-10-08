import { Component, OnInit } from '@angular/core';

import { NgClass, NgIf } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AccountService } from '@app/services';

@Component({
  selector: 'org-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,NgIf,RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent
{
  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  )
  {
    // redirect to home if already logged in
    if (this.accountService.userValue)
    {
      this.router.navigate(['/']);
    }
  }


  ngOnInit()
  {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenicence getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit()
  {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid)
    {
      return;
    }

    this.loading = true;
    this.accountService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next:() =>
        {
          // get return url from route parameters or default to '/'
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error:(error) =>
        {
          this.alertService.error(error);
          this.loading = false;
        }
    });

  }
}
