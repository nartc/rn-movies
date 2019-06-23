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
  profilePath: string;
  logoPath: string;
  movieGenres: {
    [id: number]: string
  },
  tvGenres: {
    [id: number]: string
  }
};

const initialState = {
  isLoading: false,
  configuration: null,
  backdropPath: '',
  posterPath: '',
  profilePath: '',
  logoPath: '',
  movieGenres: {},
  tvGenres: {}
} as ConfigurationState;

export const configurationReducer: Reducer<ConfigurationState, ConfigurationActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case 'FETCH_GENRES_SUCCESS': {
      return { ...state, movieGenres: action.payload.movieGenres, tvGenres: action.payload.tvGenres };
    }
    case 'FETCH_CONFIGURATION_SUCCESS': {
      const { configuration } = action.payload;
      const backdropPath = `${ configuration.images.secure_base_url }${ configuration.images.backdrop_sizes.find(
        s => s === 'original') }`;
      const posterPath = `${ configuration.images.secure_base_url }${ configuration.images.poster_sizes.find(
        s => s === 'original') }`;
      const profilePath = `${ configuration.images.secure_base_url }${ configuration.images.profile_sizes.find(
        s => s === 'original') }`;
      const logoPath = `${ configuration.images.secure_base_url }${ configuration.images.logo_sizes.find(
        s => s === 'original') }`;
      return {
        ...state,
        configuration,
        backdropPath,
        posterPath,
        profilePath,
        logoPath,
        isLoading: false
      };
    }
    case 'FETCH_GENRES_FAILED':
    case 'FETCH_CONFIGURATION_FAILED': {
      return { ...state, isLoading: false };
    }
    case 'FETCH_GENRES':
    case 'FETCH_CONFIGURATION': {
      return { ...state, isLoading: true };
    }
    default:
      return state;
  }
};
