import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../common/auth';
import { getAuthState } from '../../common/store/reducers';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  public username = '';
  public errorMessage = '';
  public successMessage = '';

  constructor(private store: Store<any>, private authActions: AuthActions) {
    this.store.select(getAuthState).subscribe(({ isLoggedIn, inProgress, resetPassword, error }) => {
      if (resetPassword) {
        this.successMessage = 'A message with reset password instructions was sent to your registered email address.'
        this.errorMessage = '';
        return;
      } else if (error) {
        this.errorHandler(error);
      }
    });
  }

  resetPassword() {
    this.store.dispatch(this.authActions.resetPassword(this.username));
  }

  private errorHandler(error) {
    if (typeof(error._body) === 'string' && error._body.indexOf('message') !== -1) {
      this.errorMessage = JSON.parse(error._body).message;
    } else if (typeof(error._body) === 'string' && error._body.indexOf('errors') !== -1) {
      const errors = JSON.parse(error._body).errors;
      if (errors.hasOwnProperty('username')) {
        this.errorMessage = errors.username;
      }
    } else {
      this.errorMessage = 'Unforseen error.';
    }
    this.successMessage = '';
  }

}
