import { ActionType } from 'typesafe-actions';
import { Movie, MovieDetail } from '@api/Models';
import { Reducer } from 'redux';
import { moviesActions } from './moviesActions';

import {
  FETCH_MOVIES,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILED,

  FETCH_MOVIE,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILED
} from './types';

export type MoviesActions = ActionType<typeof moviesActions>;
export type MoviesState = {
  nowPlayings: Movie[];
  populars: Movie[];
  topRateds: Movie[];
  upcomings: Movie[];
  selectedMovie: MovieDetail | null;
  isLoading: boolean;
};

const initialState = {
  nowPlayings: [],
  populars: [],
  topRateds: [],
  upcomings: [],
  isLoading: false,
  selectedMovie: null
} as MoviesState;

export const moviesReducer: Reducer<MoviesState, MoviesActions> = (
  state: MoviesState = initialState,
  action: MoviesActions
) => {
  switch (action.type) {
    case FETCH_MOVIES:
    case FETCH_MOVIE: {
      return { ...state, isLoading: true };
    }
    case FETCH_MOVIES_FAILED:
    case FETCH_MOVIE_FAILED: {
      return { ...state, isLoading: false };
    }
    case FETCH_MOVIES_SUCCESS: {
      const { nowPlayings, populars, topRateds, upcomings } = action.payload;
      return { ...state, nowPlayings, populars, topRateds, upcomings, isLoading: false };
    }
    case FETCH_MOVIE_SUCCESS: {
      return { ...state, selectedMovie: action.payload.movie };
    }
    default: {
      return state;
    }
  }
};
