import { Configuration } from '@api/Models';
import { action } from 'typesafe-actions';

export const FETCH_CONFIGURATION = 'FETCH_CONFIGURATION';
export const FETCH_CONFIGURATION_SUCCESS = 'FETCH_CONFIGURATION_SUCCESS';
export const FETCH_CONFIGURATION_FAILED = 'FETCH_CONFIGURATION_FAILED';

export const configurationActions = {
  fetchConfiguration: () => action(FETCH_CONFIGURATION),
  fetchConfigurationSuccess: (config: Configuration) => action(FETCH_CONFIGURATION_SUCCESS, { configuration: config }),
  fetchConfigurationFailed: () => action(FETCH_CONFIGURATION_FAILED)
};
