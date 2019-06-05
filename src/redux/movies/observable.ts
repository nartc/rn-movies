import { ActionsObservable } from 'redux-observable';
import { switchMap, map, catchError, filter } from 'rxjs/operators';
import { MoviesActions } from './moviesReducer';
import { getMovies, getMovieById } from '@api/Movies';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { moviesActions, FETCH_MOVIE, FETCH_MOVIES } from './moviesActions';
import { isOfType } from 'typesafe-actions';

const fetchMoviesEpic = (action$: ActionsObservable<MoviesActions>) =>
  action$.pipe(
    filter(isOfType(FETCH_MOVIES)),
    switchMap(() => {
      const moviesFetch = Promise.all([
        getMovies('now_playing'),
        getMovies('popular'),
        getMovies('top_rated'),
        getMovies('upcoming')
      ]);
      return from(moviesFetch).pipe(
        map(movies => moviesActions.fetchMoviesSuccess(movies)),
        catchError(() => of(moviesActions.fetchMoviesFailed()))
      );
    })
  );

const fetchMovieEpic = (action$: ActionsObservable<MoviesActions>) =>
  action$.pipe(
    filter(isOfType(FETCH_MOVIE)),
    switchMap(action => {
      return from(getMovieById(action.payload.id)).pipe(
        map(movie => moviesActions.fetchMovieSuccess(movie)),
        catchError(() => of(moviesActions.fetchMovieFailed()))
      );
    })
  );

export const moviesEpics = [fetchMoviesEpic, fetchMovieEpic];
