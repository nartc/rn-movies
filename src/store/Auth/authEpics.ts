import { createRequestToken, createSessionId } from '@api/Auth';
import { RequestToken } from '@api/Models';
import { getSessionId, setSessionid } from '@api/Storage';
import { authActions } from '@store/Auth/authActions';
import { AuthActions } from '@store/Auth/authReducer';
import { AppState } from '@store/configureStore';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';

export const requestTokenEpic = (action$: ActionsObservable<AuthActions>) => action$.pipe(
  filter(isActionOf(authActions.requestToken)),
  switchMap(() => {
    return from(createRequestToken()).pipe(
      map(token => authActions.requestTokenSuccess(token)),
      catchError(err => of(authActions.requestTokenFailed(err.message || err.toString())))
    );
  })
);

export const createSessionEpic = (
  action$: ActionsObservable<AuthActions>,
  state$: StateObservable<AppState>
) => action$.pipe(
  filter(isActionOf(authActions.createSession)),
  withLatestFrom(state$),
  switchMap(([_, state]) => {
    return from(getSessionId()).pipe(
      switchMap(sessionId => {
        if (sessionId) {
          return of(authActions.createSessionSuccess({ session_id: sessionId, success: true }));
        }

        return from(createSessionId((state.authState.token as RequestToken).request_token)).pipe(
          tap(session => {
            if (session) {
              setSessionid(session.session_id);
            }
          }),
          map(session => authActions.createSessionSuccess(session)),
          catchError(err => of(authActions.createSessionFailed(err.message || err.toString())))
        );
      })
    );
  })
);

export const authEpics = [requestTokenEpic, createSessionEpic];
