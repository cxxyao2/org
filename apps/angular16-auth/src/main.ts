import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import {
  fakeBackendInterceptor,
  jwtInterceptor,
  errorInterceptor,
} from '@app/helpers';
import { AppComponent } from './app/app.component';

import { APP_ROUTES } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(
      withInterceptors([
        jwtInterceptor,
        errorInterceptor,
        fakeBackendInterceptor,
      ])
    ),
  ],
}).catch((err) => console.error(err));
