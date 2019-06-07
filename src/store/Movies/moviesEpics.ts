import { Movie } from '@api/Models';
import { ConfigurationState } from '@store/Configurations/configurationReducer';
import { AppState } from '@store/configureStore';
import { FETCH_MOVIE, FETCH_MOVIES, moviesActions } from '@store/Movies/moviesActions';
import { MoviesActions } from '@store/Movies/moviesReducer';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { switchMap, map, catchError, filter, withLatestFrom } from 'rxjs/operators';
import { getMovies, getMovieById } from '@api/Movies';
import { from } from 'rxjs/internal/observable/from';
import { of } from 'rxjs/internal/observable/of';
import { isOfType } from 'typesafe-actions';

const fetchMoviesEpic = (action$: ActionsObservable<MoviesActions>, state$: StateObservable<AppState>) =>
  action$.pipe(
    filter(isOfType(FETCH_MOVIES)),
    withLatestFrom(state$),
    switchMap(([, state]) => {
      const moviesFetch = Promise.all([
        getMovies('now_playing'),
        getMovies('popular'),
        getMovies('top_rated'),
        getMovies('upcoming')
      ]);
      return from(moviesFetch).pipe(
        map(mapConfigurationToMovie(state.configurationState)),
        map(movies => moviesActions.fetchMoviesSuccess(movies)),
        catchError(() => of(moviesActions.fetchMoviesFailed()))
      );
    })
  );

const mapConfigurationToMovie = (configuration: ConfigurationState) => (movies: Movie[][]) => {
  for (let i = 0, len = movies.length; i < len; i++) {
    for (let j = 0, innerLen = movies[i].length; j < innerLen; j++) {
      const movie = movies[i][j];
      movie.backdrop_path = `${ configuration.backdropPath }${ movie.backdrop_path }`;
      movie.poster_path = `${ configuration.posterPath }${ movie.poster_path }`;
    }
  }
  return movies;
};

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
