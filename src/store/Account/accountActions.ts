import { Account, AccountMediaType, Movie, TvShow } from '@api/Models';
import { createAction } from 'typesafe-actions';

export const accountActions = {
  getAccountDetail: createAction('GET_ACCOUNT_DETAIL', action => action),
  getAccountDetailSuccess: createAction('GET_ACCOUNT_DETAIL_SUCCESS',
    action => (account: Account) => action({ account })),
  getAccountDetailFailed: createAction('GET_ACCOUNT_DETAIL_FAILED', action => (err: string) => action({ err })),
  getAccountMovies: createAction('GET_ACCOUNT_MOVIES',
    action => (page: number, type: AccountMediaType) => action({
      page,
      type
    })),
  getAccountMoviesSuccess: createAction('GET_ACCOUNT_MOVIES_SUCCESS',
    action => (type: AccountMediaType, movies: Movie[]) => action({ type, movies })),
  getAccountMoviesFailed: createAction('GET_ACCOUNT_MOVIES_FAILED', action => action),
  getAccountShows: createAction('GET_ACCOUNT_SHOWS',
    action => (page: number, type: AccountMediaType) => action({ page, type })),
  getAccountShowsSuccess: createAction('GET_ACCOUNT_SHOWS_SUCCESS',
    action => (type: AccountMediaType, shows: TvShow[]) => action({ type, shows })),
  getAccountShowsFailed: createAction('GET_ACCOUNT_SHOWS_FAILED', action => action)
};
