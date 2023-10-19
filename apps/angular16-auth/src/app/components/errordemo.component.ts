import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrordemoService } from '@app/services/errordemo.service';
import { catchError, ignoreElements, of } from 'rxjs';

@Component({
  selector: 'org-errordemo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './errordemo.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrordemoComponent {
  // user$ = this.userService.getClientWithError();
  user$ = this.userService.getTemporalClient();
  userError$ = this.user$.pipe(
    ignoreElements(),
    catchError((err) => of(err))
  );

  constructor(private userService: ErrordemoService) {}

  nextUser(): void {
    this.userService.getClient();
  }
}
