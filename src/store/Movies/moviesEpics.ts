import { Movie } from '@api/Models';
import { ConfigurationState } from '@store/Configurations/configurationReducer';
import { AppState } from '@store/configureStore';
import { FETCH_MOVIE, FETCH_MOVIES, FETCH_MOVIES_BY_PAGE, moviesActions } from '@store/Movies/moviesActions';
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

const fetchMoviesByPageEpic = (action$: ActionsObservable<MoviesActions>, state$: StateObservable<AppState>) =>
  action$.pipe(
    filter(isOfType(FETCH_MOVIES_BY_PAGE)),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      return from(getMovies(action.payload.type, action.payload.page)).pipe(
        map(mapConfigurationToMovies(state.configurationState)),
        map(movies => moviesActions.fetchMoviesByPageSuccess(action.payload.type, movies)),
        catchError(() => of(moviesActions.fetchMoviesByPageFailed()))
      );
    })
  );

const mapConfigurationToMovie = (configuration: ConfigurationState) => (movies: Movie[][]) => {
  for (let i = 0, len = movies.length; i < len; i++) {
    movies[i] = mapConfigurationToMovies(configuration)(movies[i]);
  }
  return movies;
};

const mapConfigurationToMovies = (configuration: ConfigurationState) => (movies: Movie[]) => {
  for (let i = 0, len = movies.length; i < len; i++) {
    const movie = movies[i];
    movie.genre_names = movie.genre_ids.map(id => configuration.movieGenres[id]);
    movie.backdrop_path = `${ configuration.backdropPath }${ movie.backdrop_path }`;
    movie.poster_path = `${ configuration.posterPath }${ movie.poster_path }`;
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

export const moviesEpics = [fetchMoviesEpic, fetchMovieEpic, fetchMoviesByPageEpic];
