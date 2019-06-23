import { moviesActions } from '@store/Movies/moviesActions';
import { ActionType } from 'typesafe-actions';
import { AccountState, Movie, MovieDetail } from '@api/Models';
import { Reducer } from 'redux';

export type MoviesActions = ActionType<typeof moviesActions>;
export type MoviesState = {
  nowPlayings: Movie[];
  populars: Movie[];
  topRateds: Movie[];
  upcomings: Movie[];
  selectedMovie: MovieDetail | null;
  isLoading: boolean;
  searchMovies: {
    [type: string]: Movie[]
  },
  filtered: {
    [type: string]: Movie[]
  },
  selectedMovieAccountState: AccountState | null;
};

const initialState = {
  nowPlayings: [],
  populars: [],
  topRateds: [],
  upcomings: [],
  isLoading: false,
  selectedMovie: null,
  searchMovies: {},
  filtered: {},
  selectedMovieAccountState: null
} as MoviesState;

export const moviesReducer: Reducer<MoviesState, MoviesActions> = (
  state: MoviesState = initialState,
  action: MoviesActions
) => {
  switch (action.type) {
    case 'FETCH_MOVIE_ACCOUNT_STATES_SUCCESS': {
      return { ...state, isLoading: false, selectedMovieAccountState: action.payload.accountState };
    }
    case 'FILTER_MOVIES': {
      const { type, query } = action.payload;
      const filtered = {
        [type]: state.searchMovies[type].filter(m => m.title.toLowerCase().includes(query.toLowerCase()))
      };
      return { ...state, filtered };
    }
    case 'FETCH_MOVIES_BY_PAGE_SUCCESS': {
      const { type, movies } = action.payload;
      const searchMovies = { ...state.searchMovies, [type]: [...state.searchMovies[type], ...movies] };
      const filtered = { [type]: state.searchMovies[type] };
      return { ...state, isLoading: false, searchMovies, filtered };
    }
    case 'FETCH_MOVIE_ACCOUNT_STATES':
    case 'FETCH_MOVIES_BY_PAGE':
    case 'FETCH_MOVIE':
    case 'FETCH_MOVIES': {
      return { ...state, isLoading: true };
    }
    case 'FETCH_MOVIE_ACCOUNT_STATES_FAILED':
    case 'FETCH_MOVIES_BY_PAGE_FAILED':
    case 'FETCH_MOVIES_FAILED':
    case 'FETCH_MOVIE_FAILED': {
      return { ...state, isLoading: false };
    }
    case 'FETCH_MOVIES_SUCCESS': {
      const { nowPlayings, populars, topRateds, upcomings } = action.payload;
      const searchMovies = {
        'now_playing': nowPlayings,
        'popular': populars,
        'top_rated': topRateds,
        'upcoming': upcomings
      };
      return { ...state, nowPlayings, populars, topRateds, upcomings, searchMovies, isLoading: false };
    }
    case 'FETCH_MOVIE_SUCCESS': {
      return { ...state, isLoading: false, selectedMovie: action.payload.movie };
    }
    default: {
      return state;
    }
  }
};
