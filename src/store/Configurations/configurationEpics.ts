import { getConfiguration } from '@api/Configuration';
import { configurationActions, FETCH_CONFIGURATION } from '@store/Configurations/configurationActions';
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
      catchError(() => of(configurationActions.fetchConfigurationFailed()))
    );
  })
);

export const configurationEpics = [fetchConfigurationEpic];
