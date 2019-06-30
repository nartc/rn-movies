import { Account, AccountMediaType, FavoriteParams, Movie, TvShow, WatchlistParams } from '@api/Models';
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
  getAccountShowsFailed: createAction('GET_ACCOUNT_SHOWS_FAILED', action => action),
  getAverageMoviesRating: createAction('GET_AVERAGE_MOVIES_RATING', action => action),
  getAverageMoviesRatingSuccess: createAction('GET_AVERAGE_MOVIES_RATING_SUCCESS',
    action => (rating: number) => action({ rating })),
  getAverageMoviesRatingFailed: createAction('GET_AVERAGE_MOVIES_RATING_FAILED', action => action),
  getAverageShowsRating: createAction('GET_AVERAGE_SHOWS_RATING', action => action),
  getAverageShowsRatingSuccess: createAction('GET_AVERAGE_SHOWS_RATING_SUCCESS',
    action => (rating: number) => action({ rating })),
  getAverageShowsRatingFailed: createAction('GET_AVERAGE_SHOWS_RATING_FAILED', action => action),
  getAccountMediaCount: createAction('GET_ACCOUNT_MEDIA_COUNT', action => action),
  getAccountMediaCountSuccess: createAction('GET_ACCOUNT_MEDIA_COUNT_SUCCESS',
    action => (watchlist: number, favorites: number, rated: number) => action({ watchlist, favorites, rated })),
  getAccountMediaCountFailed: createAction('GET_ACCOUNT_MEDIA_COUNT_FAILED', action => action),
  toggleFavorite: createAction('TOGGLE_FAVORITE',
    action => (favoriteParams: FavoriteParams) => action(favoriteParams)),
  toggleWatchlist: createAction('TOGGLE_WATCHLIST',
    action => (watchlistParams: WatchlistParams) => action(watchlistParams))
};
