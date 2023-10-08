import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private subject = new Subject<any>();
  private showAfterRedict = false;

  constructor(private router: Router) {
    // clear alert message on route change unless 'showAfterRedict' flag is true
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.showAfterRedict) {
          // only keep for a single route change
          this.showAfterRedict = false;
        } else {
          // clear alert message
          this.clear();
        }
      }
    });
  }

  onAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, showAfterRedict = false) {
    this.showAfterRedict = showAfterRedict;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, showAfterRedict = false)
  {
    this.showAfterRedict = showAfterRedict;
    this.subject.next({ type: 'error', text: message });
  }


  clear() {
    this.subject.next(null);
  }
}
