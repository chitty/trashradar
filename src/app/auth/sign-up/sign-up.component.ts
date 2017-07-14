import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Rx';

import { RegistrationCredentials , AuthActions } from '../../common/auth';
import { getAuthState } from '../../common/store/reducers';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent  implements OnDestroy {
  public credentials: RegistrationCredentials  = {
    username: '',
    password: '',
    email: ''
  };
  public loading;
  public errorMessage = '';
  public successMessage = '';
  private authStateSubscription: Subscription;

  constructor(private router: Router, private store: Store<any>, private authActions: AuthActions) {
    this.authStateSubscription = this.store.select(getAuthState).subscribe(({ inProgress, newUser, error }) => {
      if (newUser) {
        this.successMessage = 'A verification message was sent to your email address.';
        this.errorMessage = '';
        return;
      }
      this.loading = inProgress;

      if (error) {
        this.errorHandler(error);
      }
    });
  }

  signUp() {
    this.store.dispatch(this.authActions.signUp(this.credentials));
  }

  public ngOnDestroy() {
    this.authStateSubscription.unsubscribe();
  }

  private errorHandler(error) {
    if (typeof(error._body) === 'string' && error._body.indexOf('message') !== -1) {
      this.errorMessage = JSON.parse(error._body).message;
    } else if (typeof(error._body) === 'string' && error._body.indexOf('email') !== -1) {
      this.errorMessage = JSON.parse(error._body).email;
    } else if (typeof(error._body) === 'string' && error._body.indexOf('username') !== -1) {
      this.errorMessage = JSON.parse(error._body).username;
    } else {
      this.errorMessage = 'Unforseen error.';
    }
    this.successMessage = '';
  }
}
