import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

import { environment } from '@environments/environment';
import { AccountService } from '@app/services';

export function jwtInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
  // add auth header with jwt if user is logged in and request is ot the api url
  // const accountService = inject(AccountService);
  // const user = accountService.userValue;
  // const isLoggedIn = user && user.token;
  // const isApiUrl = request.url.startsWith(environment.apiUrl);
  // if (isLoggedIn && isApiUrl) {
  //   request = request.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   });
  // }

  // add token from Net.Core 6
  const token = localStorage.getItem('authToken');
  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(request);
}
