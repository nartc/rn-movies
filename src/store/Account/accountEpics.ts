import { getAccountDetail, getAccountMedias } from '@api/Account';
import { Session, Movie, Account, TvShow } from '@api/Models';
import { accountActions } from '@store/Account/accountActions';
import { AccountActions } from '@store/Account/accountReducer';
import { AppState } from '@store/configureStore';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { forkJoin } from 'rxjs';
import { catchError, filter, map, pluck, switchMap, tap, withLatestFrom } from 'rxjs/operators';
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
        account.avatar_url = `https://www.gravatar.com/avatar/${ account.avatar.gravatar.hash }.jpg?s=200`;
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
      map(movies => accountActions.getAccountMoviesSuccess(type, movies.results)),
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
      map(shows => accountActions.getAccountShowsSuccess(type, shows.results)),
      catchError(() => of(accountActions.getAccountShowsFailed()))
    );
  })
);

const getAverageMoviesRatingEpic = (
  action$: ActionsObservable<AccountActions>,
  state$: StateObservable<AppState>
) => {
  let accountId: number;
  let sessionId: string;
  let flattenRatings: number[] = [];
  return action$.pipe(
    filter(isActionOf(accountActions.getAverageMoviesRating)),
    withLatestFrom(state$),
    switchMap(([_, state]) => {
      accountId = (state.accountState.account as Account).id;
      sessionId = (state.authState.session as Session).session_id;
      return from(getAccountMedias<Movie>(accountId, sessionId, 'movies', 'rated')).pipe(
        tap(result => {
          flattenRatings.push(...result.results.map(r => r.rating));
        }),
        pluck('total_pages')
      );
    }),
    switchMap(pages => {
      const ratedMoviesFetched = [];
      const getAverage = (arr: number[]) => arr.reduce((avg, cur) => avg + cur) / arr.length;

      if (pages < 2) {
        const average = getAverage(flattenRatings);
        return of(accountActions.getAverageMoviesRatingSuccess(average));
      }

      for (let i = 2; i <= pages; i++) {
        ratedMoviesFetched.push(
          from(getAccountMedias<Movie>(accountId, sessionId, 'movies', 'rated', i)).pipe(
            pluck('results'),
            map(results => results.map(r => r.rating))
          )
        );
      }

      return forkJoin(ratedMoviesFetched).pipe(
        map(ratings => {
          flattenRatings = flattenRatings.concat(...ratings);
          return getAverage(flattenRatings);
        }),
        map(average => accountActions.getAverageMoviesRatingSuccess(average)),
        catchError(() => of(accountActions.getAverageMoviesRatingFailed()))
      );
    })
  );
};

export const accountEpics = [
  getAccountDetailEpic,
  getAccountMoviesEpic,
  getAccountShowsEpic,
  getAverageMoviesRatingEpic
];
