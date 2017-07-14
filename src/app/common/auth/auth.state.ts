import { Authorization } from '../auth/auth.model';

export interface AuthState {
  inProgress: boolean;
  isLoggedIn: boolean;
  user?: Authorization;
  newUser?: boolean;
  resetPassword?: boolean;
  error?: object;
}

export const initialAuthState: AuthState = {
  inProgress: false,
  isLoggedIn: false,
  user: null,
  newUser: false,
  resetPassword: false,
  error: null
};
