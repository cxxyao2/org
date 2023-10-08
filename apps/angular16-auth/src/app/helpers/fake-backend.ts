import { HttpRequest, HttpResponse, HttpHandlerFn } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

const usersKey = 'angular16-auth-users';
let users: any[] = JSON.parse(localStorage.getItem(usersKey)!) || [];

export function fakeBackendInterceptor(
  request: HttpRequest<any>,
  next: HttpHandlerFn
) {
  const { url, method, headers, body } = request;

  return handleRoute();

  function handleRoute() {
    switch (true) {
      case url.endsWith('/users/authenticate') && method === 'POST':
        return authenticate();
      case url.endsWith('/users/register') && method === 'POST':
        return register();
      case url.endsWith('/users') && method === 'GET':
        return getUsers();
      case url.match(/\/users\/\d+$/) && method === 'GET':
        return getUserById();
      case url.match(/\/users\/\d+$/) && method === 'DELETE':
        return deleteUser();
      default:
        return next(request);
    }
  }

  // route functions
  function authenticate() {
    const { username, password } = body;
    const user = users.find(
      (x: any) => x.username === username && x.password === password
    );
    if (!user) return error('Username or password is incorrect');
    return ok({
      ...basicDetails(user),
      token: 'fake-jwt-token',
    });
  }

  function register() {
    const user = body;

    if (users.find((x: any) => x.username === user.username)) {
      return error(`Username  ${user.username} is already taken`);
    }

    user.id = users.length ? Math.max(...users.map((x: any) => x.id)) + 1 : 1;
    users.push(user);
    localStorage.setItem(usersKey, JSON.stringify(users));

    return ok();
  }

  function getUsers() {
    if (!isLoggedIn()) return unauthorized();
    return ok(users.map((x: any) => basicDetails(x)));
  }

  function getUserById() {
    if (!isLoggedIn()) return unauthorized();

    const user = users.find((x: any) => x.id === idFromUrl());
    return ok(basicDetails(user));
  }

  function updateUser() {
    if (!isLoggedIn()) return unauthorized();

    const params = body;
    const user = users.find((x: any) => x.id === idFromUrl());

    if (!params.password) {
      delete params.password;
    }

    Object.assign(user, params);
    localStorage.setItem(usersKey, JSON.stringify(users));

    return ok();
  }

  function deleteUser() {
    if (!isLoggedIn()) return unauthorized();

    users = users.filter((x: any) => x.id !== idFromUrl());
    localStorage.setItem(usersKey, JSON.stringify(users));
    return ok();
  }

  // helper functions

  function ok(body?: any) {
    return of(new HttpResponse({ status: 200, body })).pipe(delay(500));
  }

  function error(message: any) {
    return throwError(() => ({ error: { message } })).pipe(
      materialize(),
      delay(500),
      dematerialize()
    ); // call materialize and dematerialize to ensure delay even if an error is thrown
  }

  function unauthorized() {
    return throwError(() => ({
      status: 401,
      error: { message: 'Unauthorised' },
    })).pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown
  }

  function basicDetails(user: any) {
    const { id, username, firstName, lastName } = user;
    return { id, username, firstName, lastName };
  }

  function isLoggedIn() {
    return headers.get('Authorization') === 'Bearer fake-jwt-token';
  }

  function idFromUrl() {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 1]);
  }
}
