import { Authorization } from '../auth/auth.model';

export interface AuthState {
  inProgress: boolean;
  isLoggedIn: boolean;
  user?: Authorization;
  resetPassword?: boolean;
  error?: object;
}

export const initialAuthState: AuthState = {
  inProgress: false,
  isLoggedIn: false,
  user: null,
  resetPassword: false,
  error: null
};
