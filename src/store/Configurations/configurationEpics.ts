import { getConfiguration, getGenres } from '@api/Configuration';
import { Genre } from '@api/Models';
import { configurationActions, FETCH_CONFIGURATION, FETCH_GENRES } from '@store/Configurations/configurationActions';
import { ConfigurationActions } from '@store/Configurations/configurationReducer';
import { ActionsObservable } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

const fetchConfigurationEpic = (action$: ActionsObservable<ConfigurationActions>) => action$.pipe(
  filter(isOfType(FETCH_CONFIGURATION)),
  switchMap(() => {
    return from(getConfiguration()).pipe(
      map(configuration => configurationActions.fetchConfigurationSuccess(configuration)),
      catchError((err: any) => {
        console.log(err);
        return of(configurationActions.fetchConfigurationFailed());
      })
    );
  })
);

const fetchGenresEpic = (action$: ActionsObservable<ConfigurationActions>) => action$.pipe(
  filter(isOfType(FETCH_GENRES)),
  switchMap(() => {
    const fetchGenres = Promise.all([
      getGenres('movie'),
      getGenres('tv')
    ]);
    return from(fetchGenres).pipe(
      map(([movies, tvs]) => entitizeGenres(movies, tvs)),
      map(genres => configurationActions.fetchGenresSuccess(genres.movieGenres, genres.tvGenres)),
      catchError(() => of(configurationActions.fetchGenresFailed()))
    );
  })
);

const entitizeGenres = (movies: Genre[], tvs: Genre[]) => {
  const movieGenres = movies.reduce<{ [id: number]: string }>((entities, mg) => {
    entities[mg.id] = mg.name;
    return entities;
  }, {});

  const tvGenres = tvs.reduce<{ [id: number]: string }>((entities, tg) => {
    entities[tg.id] = tg.name;
    return entities;
  }, {});

  return { movieGenres, tvGenres };
};

export const configurationEpics = [fetchConfigurationEpic, fetchGenresEpic];
