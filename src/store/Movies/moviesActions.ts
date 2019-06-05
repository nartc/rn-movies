import { action } from 'typesafe-actions';
import { Movie, MovieDetail } from '@api/Models';

export const FETCH_MOVIES = 'FETCH_MOVIES';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILED = 'FETCH_MOVIES_FAILED';
export const FETCH_MOVIE = 'FETCH_MOVIE';
export const FETCH_MOVIE_SUCCESS = 'FETCH_MOVIE_SUCCESS';
export const FETCH_MOVIE_FAILED = 'FETCH_MOVIE_FAILED';

export const moviesActions = {
  fetchMovies: () => action(FETCH_MOVIES),
  fetchMoviesSuccess: ([nowPlayings, populars, topRateds, upcomings]: Movie[][]) =>
    action(FETCH_MOVIES_SUCCESS, { nowPlayings, populars, topRateds, upcomings }),
  fetchMoviesFailed: () => action(FETCH_MOVIES_FAILED),
  fetchMovie: (id: number) => action(FETCH_MOVIE, { id }),
  fetchMovieSuccess: (movie: MovieDetail) => action(FETCH_MOVIE_SUCCESS, { movie }),
  fetchMovieFailed: () => action(FETCH_MOVIE_FAILED)
};
