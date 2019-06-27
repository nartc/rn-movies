import { AccountState, TvShow, TvShowDetail } from '@api/Models';
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
  selectedShow: TvShowDetail | null;
  searchShows: {
    [type: string]: TvShow[]
  };
  filtered: {
    [type: string]: TvShow[]
  };
  selectedShowAccountState: AccountState | null;
};

const initialState = {
  isLoading: false,
  populars: [],
  topRateds: [],
  onTheAirs: [],
  airingTodays: [],
  selectedShow: null,
  searchShows: {},
  filtered: {},
  selectedShowAccountState: null
} as ShowsState;

export const showsReducer: Reducer<ShowsState, ShowsActions> = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SHOW_ACCOUNT_STATES_SUCCESS': {
      return { ...state, isLoading: false, selectedShowAccountState: action.payload.accountState };
    }
    case 'FETCH_SHOWS_BY_PAGE_SUCCESS': {
      const { type, shows } = action.payload;
      const searchShows = { ...state.searchShows, [type]: [...state.searchShows[type], ...shows] };
      const filtered = { [type]: state.searchShows[type] };
      return { ...state, isLoading: false, searchShows, filtered };
    }
    case 'FILTER_SHOWS': {
      const { type, query } = action.payload;
      const filtered = {
        [type]: state.searchShows[type].filter(s => s.name.toLowerCase().includes(query.toLowerCase()))
      };
      return { ...state, filtered };
    }
    case 'FETCH_SHOW_SUCCESS': {
      return { ...state, isLoading: false, selectedShow: action.payload.show };
    }
    case 'FETCH_SHOW':
    case 'FETCH_SHOWS_BY_PAGE':
    case 'FETCH_SHOW_ACCOUNT_STATES':
    case 'FETCH_SHOWS': {
      return { ...state, isLoading: true };
    }
    case 'FETCH_SHOWS_SUCCESS': {
      const { airingTodays, onTheAirs, populars, topRateds } = action.payload;
      const searchShows = {
        'airing_today': airingTodays,
        'on_the_air': onTheAirs,
        'popular': populars,
        'top_rated': topRateds
      };
      return {
        ...state,
        isLoading: false,
        airingTodays,
        onTheAirs,
        populars,
        topRateds,
        searchShows
      };
    }
    case 'FETCH_SHOW_FAILED':
    case 'FETCH_SHOW_ACCOUNT_STATES_FAILED':
    case 'FETCH_SHOWS_BY_PAGE_FAILED':
    case 'FETCH_SHOWS_FAILED': {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
};
