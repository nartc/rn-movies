import {
  FETCH_MOVIES,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILED,

  FETCH_MOVIE,
  FETCH_MOVIE_SUCCESS,
  FETCH_MOVIE_FAILED
} from './types';

export const moviesActions = {
  fetchMovies: () => action(FETCH_MOVIES),
  fetchMoviesSuccess: ([nowPlayings, populars, topRateds, upcomings]: Movie[][]) =>
    action(FETCH_MOVIES_SUCCESS, { nowPlayings, populars, topRateds, upcomings }),
  fetchMoviesFailed: () => action(FETCH_MOVIES_FAILED),

  fetchMovie: (id: number) => action(FETCH_MOVIE, { id }),
  fetchMovieSuccess: (movie: MovieDetail) => action(FETCH_MOVIE_SUCCESS, { movie }),
  fetchMovieFailed: () => action(FETCH_MOVIE_FAILED)
};
