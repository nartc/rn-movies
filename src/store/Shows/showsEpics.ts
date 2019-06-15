import { TvShow } from '@api/Models';
import { getShows } from '@api/Shows';
import { ConfigurationState } from '@store/Configurations/configurationReducer';
import { AppState } from '@store/configureStore';
import { FETCH_SHOWS, showsActions } from '@store/Shows/showsActions';
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
      map(mapConfigurationToShow(state.configurationState)),
      map(shows => showsActions.fetchShowsSuccess(shows)),
      catchError(() => of(showsActions.fetchShowsFailed()))
    );
  })
);

const mapConfigurationToShow = (configuration: ConfigurationState) => (shows: TvShow[][]) => {
  for (let i = 0, len = shows.length; i < len; i++) {
    for (let j = 0, innerLen = shows[i].length; j < innerLen; j++) {
      const show = shows[i][j];
      show.genre_names = show.genre_ids.map(id => configuration.tvGenres[id]);
      show.backdrop_path = `${ configuration.backdropPath }${ show.backdrop_path }`;
      show.poster_path = `${ configuration.posterPath }${ show.poster_path }`;
    }
  }

  return shows;
};

export const showsEpics = [fetchShowsEpic];
