import { RequestToken, Session } from '@api/Models';
import { createAction } from 'typesafe-actions';

export const authActions = {
  requestToken: createAction('REQUEST_TOKEN', action => action),
  requestTokenSuccess: createAction('REQUEST_TOKEN_SUCCESS', action => (token: RequestToken) => action({ token })),
  requestTokenFailed: createAction('REQUEST_TOKEN_FAILED', action => (err: string) => action({ err })),
  createSession: createAction('CREATE_SESSION', action => action),
  createSessionSuccess: createAction('CREATE_SESSION_SUCCESS', action => (session: Session) => action({ session })),
  createSessionFailed: createAction('CREATE_SESSION_FAILED', action => (err: string) => action({ err }))
};
