import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'org-button',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  title = 'angular16-auth';
  firstName = signal('');
  lastName = signal('');
  email = '';
  password = '';

  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
  

  onSubmit() {
    console.log('onSubmit');
  }
}
