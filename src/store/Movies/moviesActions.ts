import { action } from 'typesafe-actions';
import { AccountState, Movie, MovieDetail, MovieEndpointsPath } from '@api/Models';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILED = 'FETCH_MOVIES_FAILED';
export const FETCH_MOVIES_BY_PAGE = 'FETCH_MOVIES_BY_PAGE';
export const FETCH_MOVIES_BY_PAGE_SUCCESS = 'FETCH_MOVIES_BY_PAGE_SUCCESS';
export const FETCH_MOVIES_BY_PAGE_FAILED = 'FETCH_MOVIES_BY_PAGE_FAILED';
export const FETCH_MOVIE = 'FETCH_MOVIE';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIE_FAILED = 'FETCH_MOVIE_FAILED';
export const FILTER_MOVIES = 'FILTER_MOVIES';
export const FETCH_MOVIE_ACCOUNT_STATES = 'FETCH_MOVIE_ACCOUNT_STATES';
export const FETCH_MOVIE_ACCOUNT_STATES_SUCCESS = 'FETCH_MOVIE_ACCOUNT_STATES_SUCCESS';
export const FETCH_MOVIE_ACCOUNT_STATES_FAILED = 'FETCH_MOVIE_ACCOUNT_STATES_FAILED';

export const moviesActions = {
  fetchMovies: () => action(FETCH_MOVIES),
  fetchMoviesSuccess: ([nowPlayings, populars, topRateds, upcomings]: Movie[][]) =>
    action(FETCH_MOVIES_SUCCESS, { nowPlayings, populars, topRateds, upcomings }),
  fetchMoviesFailed: () => action(FETCH_MOVIES_FAILED),
  fetchMovie: (id: number) => action(FETCH_MOVIE, { id }),
  fetchMovieSuccess: (movie: MovieDetail) => action(FETCH_MOVIE_SUCCESS, { movie }),
  fetchMovieFailed: () => action(FETCH_MOVIE_FAILED),
  fetchMoviesByPage: (type: MovieEndpointsPath, page: number) => action(FETCH_MOVIES_BY_PAGE, { type, page }),
  fetchMoviesByPageSuccess: (type: MovieEndpointsPath, movies: Movie[]) => action(FETCH_MOVIES_BY_PAGE_SUCCESS, {
    type,
    movies
  }),
  fetchMoviesByPageFailed: () => action(FETCH_MOVIES_BY_PAGE_FAILED),
  filterMovies: (type: MovieEndpointsPath, query: string) => action(FILTER_MOVIES, { type, query }),
  fetchMovieAccountStates: (id: number) => action(FETCH_MOVIE_ACCOUNT_STATES, { id }),
  fetchMovieAccountStatesSuccess: (accountState: AccountState) => action(FETCH_MOVIE_ACCOUNT_STATES_SUCCESS,
    { accountState }),
  fetchMovieAccountStatesFailed: () => action(FETCH_MOVIE_ACCOUNT_STATES_FAILED)
};
