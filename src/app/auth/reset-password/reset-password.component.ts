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

  constructor(private store: Store<any>, private authActions: AuthActions) { }

  reset_password() {
    this.store.dispatch(this.authActions.resetPassword(this.username));
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

  private errorHandler(error) {
    if (error._body.indexOf('message') !== -1) {
      this.errorMessage = JSON.parse(error._body).message;
    } else if (error._body.indexOf('errors') !== -1) {
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
