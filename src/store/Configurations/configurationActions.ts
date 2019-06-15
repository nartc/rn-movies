import { Configuration } from '@api/Models';
import { action } from 'typesafe-actions';

export const FETCH_CONFIGURATION = 'FETCH_CONFIGURATION';
export const FETCH_CONFIGURATION_SUCCESS = 'FETCH_CONFIGURATION_SUCCESS';
export const FETCH_CONFIGURATION_FAILED = 'FETCH_CONFIGURATION_FAILED';
export const FETCH_GENRES = 'FETCH_GENRES';
export const FETCH_GENRES_SUCCESS = 'FETCH_GENRES_SUCCESS';
export const FETCH_GENRES_FAILED = 'FETCH_GENRES_FAILED';

export const configurationActions = {
  fetchConfiguration: () => action(FETCH_CONFIGURATION),
  fetchConfigurationSuccess: (config: Configuration) => action(FETCH_CONFIGURATION_SUCCESS, { configuration: config }),
  fetchConfigurationFailed: () => action(FETCH_CONFIGURATION_FAILED),
  fetchGenres: () => action(FETCH_GENRES),
  fetchGenresSuccess: (movieGenres: { [id: number]: string }, tvGenres: { [id: number]: string }) => action(FETCH_GENRES_SUCCESS, {
    movieGenres,
    tvGenres
  }),
  fetchGenresFailed: () => action(FETCH_GENRES_FAILED)
};
