import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';

import { AuthService } from './auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  public login$: Observable<Action> = this.actions$
    .ofType(AuthActions.LOGIN)
    .map(toPayload)
    .switchMap((credentials) => this.authService.login(credentials)
      .map((user) => this.authActions.loginSuccess(user))
      .catch((error) => of(this.authActions.loginFailed(error)))
    );

  @Effect({ dispatch: false })
  public logout$: Observable<any> = this.actions$
    .ofType(AuthActions.LOGOUT)
    .switchMap(() => this.authService.logout());

  @Effect()
  public resetPassword$: Observable<any> = this.actions$
    .ofType(AuthActions.RESET_PASSWORD)
    .switchMap((username) => this.authService.resetPassword(username.payload)
      .map(() => this.authActions.resetPasswordSuccess())
      .catch((error) => of(this.authActions.resetPasswordFailed(error)))
    );

  constructor(private actions$: Actions, private authService: AuthService, private authActions: AuthActions) {}
}
