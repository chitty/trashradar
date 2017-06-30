import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { getAuthState } from '../store/reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<any>, private router: Router) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isLogged;
    this.store.select(getAuthState).take(1).subscribe(({ isLoggedIn }) => isLogged = isLoggedIn);
    if (isLogged) { return true; }

      this.router.navigate(['/auth']);
      return false;
  }
}
