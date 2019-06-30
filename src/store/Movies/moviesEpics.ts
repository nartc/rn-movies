import { Movie, MovieDetail, Session } from '@api/Models';
import { ConfigurationState } from '@store/Configurations/configurationReducer';
import { AppState } from '@store/configureStore';
import {
  FETCH_MOVIE,
  FETCH_MOVIE_ACCOUNT_STATES,
  FETCH_MOVIES,
  FETCH_MOVIES_BY_PAGE,
  moviesActions, RATE_MOVIE
} from '@store/Movies/moviesActions';
import { MoviesActions } from '@store/Movies/moviesReducer';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { switchMap, map, catchError, filter, withLatestFrom } from 'rxjs/operators';
import { getMovies, getMovieById, getMovieAccountState, rateMovie } from '@api/Movies';
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

const fetchMovieEpic = (action$: ActionsObservable<MoviesActions>, state$: StateObservable<AppState>) =>
  action$.pipe(
    filter(isOfType(FETCH_MOVIE)),
    withLatestFrom(state$),
    switchMap(([action, state]) => {
      return from(getMovieById(action.payload.id)).pipe(
        map(mapConfigurationToMovieDetail(state.configurationState)),
        map(movie => moviesActions.fetchMovieSuccess(movie)),
        catchError(() => of(moviesActions.fetchMovieFailed()))
      );
    })
  )
;

const mapConfigurationToMovieDetail = (configuration: ConfigurationState) => (movie: MovieDetail) => {
  movie.backdrop_path = `${ configuration.backdropPath }${ movie.backdrop_path }`;
  movie.poster_path = `${ configuration.posterPath }${ movie.poster_path }`;
  movie.genre_names = movie.genres.map(g => g.name);
  movie.images.backdrops = movie.images.backdrops.map(bd => ({
    ...bd,
    file_path: `${ configuration.backdropPath }${ bd.file_path }`
  }));
  movie.images.posters = movie.images.posters.map(p => ({
    ...p,
    file_path: `${ configuration.posterPath }${ p.file_path }`
  }));
  movie.credits.cast = movie.credits.cast.map(c => ({
    ...c,
    profile_path: `${ configuration.profilePath }${ c.profile_path }`
  }));
  movie.credits.crew = movie.credits.crew.map(c => ({
    ...c,
    profile_path: `${ configuration.profilePath }${ c.profile_path }`
  }));
  movie.production_companies = movie.production_companies.map(pc => ({
    ...pc,
    logo_path: `${ configuration.logoPath }${ pc.logo_path }`
  }));
  movie.recommendations.results = movie.recommendations.results.map(r => ({
    ...r,
    poster_path: `${ configuration.posterPath }${ r.poster_path }`,
    backdrop_path: `${ configuration.backdropPath }${ r.backdrop_path }`
  }));
  return movie;
};

const fetchMovieAccountStatesEpic = (
  action$: ActionsObservable<MoviesActions>,
  state$: StateObservable<AppState>
) => action$.pipe(
  filter(isOfType(FETCH_MOVIE_ACCOUNT_STATES)),
  withLatestFrom(state$),
  switchMap(([action, state]) => {
    return from(getMovieAccountState(action.payload.id, (state.authState.session as Session).session_id)).pipe(
      map(accountState => moviesActions.fetchMovieAccountStatesSuccess(accountState)),
      catchError(() => of(moviesActions.fetchMovieAccountStatesFailed()))
    );
  })
);

const rateMovieEpic = (action$: ActionsObservable<MoviesActions>, state$: StateObservable<AppState>) => action$.pipe(
  filter(isOfType(RATE_MOVIE)),
  withLatestFrom(state$),
  switchMap(([action, state]) => {
    const sessionId = (state.authState.session as Session).session_id;
    return from(rateMovie(action.payload.id, action.payload.rating, sessionId)).pipe(
      map(() => moviesActions.fetchMovieAccountStates(action.payload.id))
    );
  })
);

export const moviesEpics = [
  fetchMoviesEpic,
  fetchMovieEpic,
  fetchMoviesByPageEpic,
  fetchMovieAccountStatesEpic,
  rateMovieEpic
];
