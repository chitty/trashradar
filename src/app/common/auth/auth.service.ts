import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import { Store } from '@ngrx/store';

import { Authorization, Credentials, RegistrationCredentials } from './auth.model';
import { AuthActions } from './auth.actions';
import { DjangoClientService } from '../django-client';

@Injectable()
export class AuthService {
  @LocalStorage('user', null)
  private user: Authorization;

  constructor(
    private httpService: DjangoClientService,
    private storage: LocalStorageService,
    private store: Store<any>,
    private authActions: AuthActions
  ) {
    if (this.user && this.user.token) {
      this.httpService.setAuthToken(this.user.token);
      this.store.dispatch(this.authActions.loginSuccess(this.user));
    }
    // Subscribe and update local storage
    this.store.select((state) => state.auth.user).subscribe((user) => this.user = user);
  }


  public login(userData: Credentials): Observable<Authorization> {
    return this.httpService.post('/api/v1/auth/login', userData)
      .map((user: Authorization) => {
        this.httpService.setAuthToken(user.token);

        return user;
      });
  }

  public register(userData: RegistrationCredentials): Observable<Authorization> {
    return this.httpService.post('/api/v1/accounts', {username: userData.username, email: userData.email,
                                                      password: userData.password})
      .map((user: Authorization) => {
        this.httpService.setAuthToken(user.token);

        return user;
      });
  }

  public logout() {
    return this.httpService.post('/api/v1/auth/logout', {})
      .map(() => this.httpService.setAuthToken());
  }

  public resetPassword(username: string): Observable<any> {
    return this.httpService.post('/api/v1/accounts/reset_password', {username: username})
      .map(() => this.httpService.setAuthToken());
  }

}
