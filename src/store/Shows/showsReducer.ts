import { TvShow } from '@api/Models';
import { showsActions } from '@store/Shows/showsActions';
import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

export type ShowsActions = ActionType<typeof showsActions>;
export type ShowsState = {
  isLoading: boolean;
  populars: TvShow[];
  topRateds: TvShow[];
  onTheAirs: TvShow[];
  airingTodays: TvShow[];
};

const initialState = {
  isLoading: false,
  populars: [],
  topRateds: [],
  onTheAirs: [],
  airingTodays: []
} as ShowsState;

export const showsReducer: Reducer<ShowsState, ShowsActions> = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SHOWS': {
      return { ...state, isLoading: true };
    }
    case 'FETCH_SHOWS_SUCCESS': {
      const { airingTodays, onTheAirs, populars, topRateds } = action.payload;
      return {
        isLoading: false,
        airingTodays,
        onTheAirs,
        populars,
        topRateds
      };
    }
    case 'FETCH_SHOWS_FAILED': {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
};
