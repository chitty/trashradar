import { Injectable } from '@angular/core';
import { ActionCreatorFactory } from 'ngrx-action-creator-factory';

@Injectable()
export class AuthActions {
  public static LOGIN = '[Auth] LOGIN';
  public static LOGIN_SUCCESS = '[Auth] LOGIN Success';
  public static LOGIN_FAILED = '[Auth] LOGIN Failed';
  public static LOGOUT = '[Auth] LOGOUT';
  public static RESET_PASSWORD = '[Auth] RESET_PASSWORD';
  public static RESET_PASSWORD_SUCCESS = '[Auth] RESET_PASSWORD SUCCESS';
  public static RESET_PASSWORD_FAILED = '[Auth] RESET_PASSWORD FAILED';

  public login = ActionCreatorFactory.create(AuthActions.LOGIN);
  public loginSuccess = ActionCreatorFactory.create(AuthActions.LOGIN_SUCCESS);
  public loginFailed = ActionCreatorFactory.create(AuthActions.LOGIN_FAILED);
  public logout = ActionCreatorFactory.create(AuthActions.LOGOUT);
  public resetPassword = ActionCreatorFactory.create(AuthActions.RESET_PASSWORD);
  public resetPasswordSuccess = ActionCreatorFactory.create(AuthActions.RESET_PASSWORD_SUCCESS);
  public resetPasswordFailed = ActionCreatorFactory.create(AuthActions.RESET_PASSWORD_FAILED);
}
