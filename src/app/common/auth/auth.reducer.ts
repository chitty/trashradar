import { ActionReducer, Action } from '@ngrx/store';

import { AuthState, initialAuthState } from './auth.state';
import { AuthActions } from './auth.actions';

export const AuthReducer: ActionReducer<AuthState> = (state = initialAuthState, action: Action) => {
  switch (action.type) {
    case AuthActions.RESET_PASSWORD:
    case AuthActions.LOGIN:
      return { ...state, inProgress: true, error: null };

    case AuthActions.LOGIN_SUCCESS:
      return { ...state, inProgress: false, user: action.payload, isLoggedIn: true };

    case AuthActions.LOGIN_FAILED:
      return { ...state, inProgress: false, error: action.payload };

    case AuthActions.RESET_PASSWORD_SUCCESS:
      return { ...state, inProgress: false, resetPassword: true };

    case AuthActions.RESET_PASSWORD_FAILED:
      return { ...state, inProgress: false, resetPassword: false, error: action.payload };

    case AuthActions.LOGOUT:
      return initialAuthState;

    default: {
      return state;
    }
  }
};
