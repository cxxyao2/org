import { inject } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import { AccountService } from '@app/services';

export function authGuard(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) {
  const router = inject(Router);
  const accountService = inject(AccountService);
  const user = accountService.userValue;
  if (user) {
    return true;
  }

  // if not logged in, redirect to login page with the return url
  router.navigate(['/account/login'], {
    queryParams: { returnUrl: state.url },
  });
  return false;
}
