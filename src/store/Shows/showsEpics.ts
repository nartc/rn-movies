import { Session, TvShow, TvShowDetail } from '@api/Models';
import { getShowAccountStates, getShowByid, getShows, rateShow } from '@api/Shows';
import { ConfigurationState } from '@store/Configurations/configurationReducer';
import { AppState } from '@store/configureStore';
import {
  FETCH_SHOW,
  FETCH_SHOW_ACCOUNT_STATES,
  FETCH_SHOWS,
  FETCH_SHOWS_BY_PAGE, RATE_SHOW,
  showsActions
} from '@store/Shows/showsActions';
import { ShowsActions } from '@store/Shows/showsReducer';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

const fetchShowsEpic = (action$: ActionsObservable<ShowsActions>, state$: StateObservable<AppState>) => action$.pipe(
  filter(isOfType(FETCH_SHOWS)),
  withLatestFrom(state$),
  switchMap(([, state]) => {
    const showsFetch = Promise.all([
      getShows('popular'),
      getShows('top_rated'),
      getShows('airing_today'),
      getShows('on_the_air'),
    ]);
    return from(showsFetch).pipe(
      map(mapConfigurationToShows(state.configurationState)),
      map(shows => showsActions.fetchShowsSuccess(shows)),
      catchError(() => of(showsActions.fetchShowsFailed()))
    );
  })
);

const fetchShowsByPageEpic = (
  action$: ActionsObservable<ShowsActions>,
  state$: StateObservable<AppState>
) => action$.pipe(
  filter(isOfType(FETCH_SHOWS_BY_PAGE)),
  withLatestFrom(state$),
  switchMap(([action, state]) => {
    return from(getShows(action.payload.type, action.payload.page)).pipe(
      map(mapConfigurationToShow(state.configurationState)),
      map(shows => showsActions.fetchShowsByPageSuccess(action.payload.type, shows)),
      catchError(() => of(showsActions.fetchShowsByPageFailed()))
    );
  })
);

const mapConfigurationToShows = (configuration: ConfigurationState) => (shows: TvShow[][]) => {
  for (let i = 0, len = shows.length; i < len; i++) {
    shows[i] = mapConfigurationToShow(configuration)(shows[i]);
  }

  return shows;
};

const mapConfigurationToShow = (configuration: ConfigurationState) => (shows: TvShow[]) => {
  for (let i = 0, len = shows.length; i < len; i++) {
    const show = shows[i];
    show.genre_names = show.genre_ids.map(id => configuration.tvGenres[id]);
    show.backdrop_path = `${ configuration.backdropPath }${ show.backdrop_path }`;
    show.poster_path = `${ configuration.posterPath }${ show.poster_path }`;
  }

  return shows;
};

const fetchShowEpic = (actions$: ActionsObservable<ShowsActions>, state$: StateObservable<AppState>) => actions$.pipe(
  filter(isOfType(FETCH_SHOW)),
  withLatestFrom(state$),
  switchMap(([action, state]) => {
    return from(getShowByid(action.payload.id)).pipe(
      map(mapConfigurationToShowDetail(state.configurationState)),
      map(show => showsActions.fetchShowSuccess(show)),
      catchError(() => of(showsActions.fetchShowFailed()))
    );
  })
);

const mapConfigurationToShowDetail = (configuration: ConfigurationState) => (show: TvShowDetail) => {
  show.backdrop_path = `${ configuration.backdropPath }${ show.backdrop_path }`;
  show.poster_path = `${ configuration.posterPath }${ show.poster_path }`;
  show.genre_names = show.genres.map(g => g.name);
  show.images.backdrops = show.images.backdrops.map(bd => ({
    ...bd,
    file_path: `${ configuration.backdropPath }${ bd.file_path }`
  }));
  show.images.posters = show.images.posters.map(pt => ({
    ...pt,
    file_path: `${ configuration.posterPath }${ pt.file_path }`
  }));
  show.credits.cast = show.credits.cast.map(c => ({
    ...c,
    profile_path: `${ configuration.profilePath }${ c.profile_path }`
  }));
  show.credits.crew = show.credits.crew.map(cr => ({
    ...cr,
    profile_path: `${ configuration.profilePath }${ cr.profile_path }`
  }));
  show.production_companies = show.production_companies.map(pc => ({
    ...pc,
    logo_path: `${ configuration.logoPath }${ pc.logo_path }`
  }));
  show.networks = show.networks.map(nw => ({ ...nw, logo_path: `${ configuration.logoPath }${ nw.logo_path }` }));
  show.recommendations.results = show.recommendations.results.map(rc => ({
    ...rc,
    backdrop_path: `${ configuration.backdropPath }${ rc.backdrop_path }`,
    poster_path: `${ configuration.posterPath }${ rc.poster_path }`
  }));
  return show;
};

const fetchShowAccountStatesEpic = (
  action$: ActionsObservable<ShowsActions>,
  state$: StateObservable<AppState>
) => action$.pipe(
  filter(isOfType(FETCH_SHOW_ACCOUNT_STATES)),
  withLatestFrom(state$),
  switchMap(([action, state]) => {
    return from(getShowAccountStates(action.payload.id, (state.authState.session as Session).session_id)).pipe(
      map(accountState => showsActions.fetchShowAccountStatesSuccess(accountState)),
      catchError(() => of(showsActions.fetchShowAccountStatesFailed()))
    );
  })
);

const rateShowEpic = (action$: ActionsObservable<ShowsActions>, state$: StateObservable<AppState>) => action$.pipe(
  filter(isOfType(RATE_SHOW)),
  withLatestFrom(state$),
  switchMap(([action, state]) => {
    const sessionId = (state.authState.session as Session).session_id;
    return from(rateShow(action.payload.id, action.payload.rating, sessionId)).pipe(
      map(() => showsActions.fetchShowAccountStates(action.payload.id))
    );
  })
);

export const showsEpics = [
  fetchShowsEpic,
  fetchShowEpic,
  fetchShowsByPageEpic,
  fetchShowAccountStatesEpic,
  rateShowEpic
];
