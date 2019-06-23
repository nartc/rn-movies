import { RequestToken, Session } from '@api/Models';
import { authActions } from '@store/Auth/authActions';
import { ActionType, createReducer } from 'typesafe-actions';

export type AuthActions = ActionType<typeof authActions>;
export type AuthState = {
  isLoading: boolean;
  token: RequestToken | null;
  err: string;
  isApproved: boolean;
  session: Session | null;
};

const initialState = {
  isLoading: false,
  token: null,
  err: '',
  isApproved: false,
  session: null
} as AuthState;

export const authReducer = createReducer<AuthState, AuthActions>(initialState)
  .handleAction([authActions.requestToken, authActions.createSession], state => ({ ...state, isLoading: true }))
  .handleAction([authActions.requestTokenFailed, authActions.createSessionFailed], (state, action) => ({
    ...state,
    isLoading: false,
    token: null,
    err: action.payload.err
  }))
  .handleAction(authActions.requestTokenSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    token: action.payload.token,
    err: ''
  }))
  .handleAction(authActions.createSessionSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    isApproved: true,
    session: action.payload.session
  }));
