import { Injectable } from '@angular/core';
import { User } from '@app/models';
import { BehaviorSubject, Observable, concatMap, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrordemoService {
  private Subject = new BehaviorSubject<string>('');
  private UserSubject = new BehaviorSubject<User>({
    username: 'John',
    age: 30,
  });

  setErrorMessage(message: string): void {
    this.Subject.next(message);
  }

  getErrorMessage(): Observable<string> {
    return this.Subject.asObservable();
  }

  getClient() {
    return of('John').pipe(delay(1000));
  }

  getClientWithError() {
    return of('John').pipe(
      delay(2000),
      tap(() => {
        throw new Error('Error from getClientWithError');
      })
    );
  }

  getTemporalClient() {
    return of('John', 'Joe', 'Mike').pipe(
      concatMap((name) => of(name).pipe(delay(2000))),
      tap((user) => {
        if (user === 'Mike') {
          throw new Error('Error from getTemporalClient');
        }
      })
    );
  }
}
