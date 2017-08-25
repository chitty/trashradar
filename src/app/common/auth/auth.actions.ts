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
  public static SIGN_UP = '[Auth] SIGN_UP';
  public static SIGN_UP_SUCCESS = '[Auth] SIGN_UP Success';
  public static SIGN_UP_FAILED = '[Auth] SIGN_UP Failed';

  public login = ActionCreatorFactory.create(AuthActions.LOGIN);
  public loginSuccess = ActionCreatorFactory.create(AuthActions.LOGIN_SUCCESS);
  public loginFailed = ActionCreatorFactory.create(AuthActions.LOGIN_FAILED);
  public logout = ActionCreatorFactory.create(AuthActions.LOGOUT);
  public resetPassword = ActionCreatorFactory.create(AuthActions.RESET_PASSWORD);
  public resetPasswordSuccess = ActionCreatorFactory.create(AuthActions.RESET_PASSWORD_SUCCESS);
  public resetPasswordFailed = ActionCreatorFactory.create(AuthActions.RESET_PASSWORD_FAILED);
  public signUp = ActionCreatorFactory.create(AuthActions.SIGN_UP);
  public signUpSuccess = ActionCreatorFactory.create(AuthActions.SIGN_UP_SUCCESS);
  public signUpFailed = ActionCreatorFactory.create(AuthActions.SIGN_UP_FAILED);
}
