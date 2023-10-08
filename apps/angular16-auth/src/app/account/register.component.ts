import { Component,OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { Router,ActivatedRoute,RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService,AccountService } from '@app/services';

@Component({
  selector: 'org-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,NgIf,RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit
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

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      username: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(6)]],
    });
  }

  get f() { return this.form.controls; }

  onSubmit()
  {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    if (this.form.invalid)
    {
      return;
    }

    this.loading = true;
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration successful, please check your email for verification instructions',true);
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        },
      });
  }
}
