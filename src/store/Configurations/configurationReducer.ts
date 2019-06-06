import { Configuration } from '@api/Models';
import { configurationActions } from '@store/Configurations/configurationActions';
import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

export type ConfigurationActions = ActionType<typeof configurationActions>;
export type ConfigurationState = {
  isLoading: boolean;
  configuration: Configuration | null;
  backdropPath: string;
  posterPath: string;
};

const initialState = {
  isLoading: false,
  configuration: null,
  backdropPath: '',
  posterPath: ''
} as ConfigurationState;

export const configurationReducer: Reducer<ConfigurationState, ConfigurationActions> = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CONFIGURATION_SUCCESS': {
      const { configuration } = action.payload;
      const backdropPath = `${ configuration.images.secure_base_url }${ configuration.images.backdrop_sizes.find(s => s === 'original') }`;
      const posterPath = `${ configuration.images.secure_base_url }${ configuration.images.poster_sizes.find(s => s === 'original') }`;
      return {
        configuration,
        backdropPath,
        posterPath,
        isLoading: false
      };
    }
    case 'FETCH_CONFIGURATION_FAILED': {
      return { ...state, isLoading: false };
    }
    case 'FETCH_CONFIGURATION': {
      return { ...state, isLoading: true };
    }
    default:
      return state;
  }
};
