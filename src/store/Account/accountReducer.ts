import { Account, Movie, TvShow } from '@api/Models';
import { accountActions } from '@store/Account/accountActions';
import { ActionType, createReducer } from 'typesafe-actions';

export type AccountActions = ActionType<typeof accountActions>;
export type AccountState = {
  isLoading: boolean;
  account: Account | null;
  err: string;
  favoriteMovies: Movie[];
  ratedMovies: Movie[];
  watchlistMovies: Movie[];
  favoriteShows: TvShow[];
  ratedShows: TvShow[];
  watchlistShows: TvShow[];
  averageMoviesRating: number;
  averageShowsRating: number;
  watchlistCount: number;
  favoritesCount: number;
  ratedCount: number;
};

const initialState = {
  isLoading: false,
  err: '',
  account: null,
  favoriteMovies: [],
  watchlistMovies: [],
  ratedMovies: [],
  favoriteShows: [],
  ratedShows: [],
  watchlistShows: [],
  averageMoviesRating: 0,
  averageShowsRating: 0,
  watchlistCount: 0,
  favoritesCount: 0,
  ratedCount: 0
} as AccountState;

export const accountReducer = createReducer<AccountState, AccountActions>(initialState)
  .handleAction([
      accountActions.getAccountDetail,
      accountActions.getAccountMovies,
      accountActions.getAccountShows,
      accountActions.getAverageMoviesRating,
      accountActions.getAverageShowsRating,
      accountActions.getAccountMediaCount
    ],
    state => ({ ...state, isLoading: true }))
  .handleAction([
    accountActions.getAccountMoviesFailed,
    accountActions.getAccountShowsFailed,
    accountActions.getAverageMoviesRatingFailed,
    accountActions.getAverageShowsRatingFailed,
    accountActions.getAccountMediaCountFailed
  ], state => ({
    ...state,
    isLoading: false
  }))
  .handleAction(accountActions.getAccountMediaCountSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    watchlistCount: action.payload.watchlist,
    favoritesCount: action.payload.favorites,
    ratedCount: action.payload.rated
  }))
  .handleAction(accountActions.getAverageShowsRatingSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    averageShowsRating: action.payload.rating
  }))
  .handleAction(accountActions.getAverageMoviesRatingSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    averageMoviesRating: action.payload.rating
  }))
  .handleAction(accountActions.getAccountMoviesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    [`${ action.payload.type }Movies`]: [...(state as any)[`${ action.payload.type }Movies`], ...action.payload.movies]
  }))
  .handleAction(accountActions.getAccountShowsSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    [`${ action.payload.type }Shows`]: [...(state as any)[`${ action.payload.type }Shows`], ...action.payload.shows]
  }))
  .handleAction(accountActions.getAccountDetailSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    account: action.payload.account
  }))
  .handleAction(accountActions.getAccountDetailFailed, (state, action) => ({
    ...state,
    account: null,
    isLoading: false,
    err: action.payload.err
  }));
