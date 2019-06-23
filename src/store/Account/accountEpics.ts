import { getAccountDetail, getAccountMedias } from '@api/Account';
import { Session, Movie, Account, TvShow } from '@api/Models';
import { accountActions } from '@store/Account/accountActions';
import { AccountActions } from '@store/Account/accountReducer';
import { AppState } from '@store/configureStore';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';

const getAccountDetailEpic = (
  action$: ActionsObservable<AccountActions>,
  state$: StateObservable<AppState>
) => action$.pipe(
  filter(isActionOf(accountActions.getAccountDetail)),
  withLatestFrom(state$),
  switchMap(([_, state]) => {
    return from(getAccountDetail((state.authState.session as Session).session_id)).pipe(
      map(account => {
        account.avatar_url = `https://www.gravatar.com/avatar/${ account.avatar.gravatar.hash }`;
        return accountActions.getAccountDetailSuccess(account);
      }),
      catchError(err => of(accountActions.getAccountDetailFailed(err)))
    );
  })
);

const getAccountMoviesEpic = (
  action$: ActionsObservable<AccountActions>,
  state$: StateObservable<AppState>
) => action$.pipe(
  filter(isActionOf(accountActions.getAccountMovies)),
  withLatestFrom(state$),
  switchMap(([action, state]) => {
    const { type, page } = action.payload;
    const accountId = (state.accountState.account as Account).id;
    const sessionId = (state.authState.session as Session).session_id;
    return from(getAccountMedias<Movie>(accountId, sessionId, 'movies', type, page)).pipe(
      map(movies => accountActions.getAccountMoviesSuccess(type, movies)),
      catchError(() => of(accountActions.getAccountMoviesFailed()))
    );
  })
);

const getAccountShowsEpic = (
  action$: ActionsObservable<AccountActions>,
  state$: StateObservable<AppState>
) => action$.pipe(
  filter(isActionOf(accountActions.getAccountShows)),
  withLatestFrom(state$),
  switchMap(([action, state]) => {
    const { type, page } = action.payload;
    const accountId = (state.accountState.account as Account).id;
    const sessionId = (state.authState.session as Session).session_id;
    return from(getAccountMedias<TvShow>(accountId, sessionId, 'tv', type, page)).pipe(
      map(shows => accountActions.getAccountShowsSuccess(type, shows)),
      catchError(() => of(accountActions.getAccountShowsFailed()))
    );
  })
);

export const accountEpics = [getAccountDetailEpic, getAccountMoviesEpic, getAccountShowsEpic];
