import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@app/services/auth.service';
import { User } from '@app/models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'org-auth-for-net6',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './auth-for-net6.component.html',
  styles: [],
})
export class AuthForNet6Component {
  authService = inject(AuthService);
  user = new User();

  register(): void {
    this.authService.register(this.user).subscribe();
  }

  login(): void {
    this.authService.login(this.user).subscribe({
      next: (token: string) => localStorage.setItem('authToken', token),
      error: (err) => console.log(err),
    });
  }

  getUsername(): void {
    this.authService.getUsername().subscribe();
  }
}
