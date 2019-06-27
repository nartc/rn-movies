import { AccountState, ShowEndpointsPath, TvShow, TvShowDetail } from '@api/Models';
import {
  FETCH_MOVIE_ACCOUNT_STATES,
  FETCH_MOVIE_ACCOUNT_STATES_FAILED,
  FETCH_MOVIE_ACCOUNT_STATES_SUCCESS
} from '@store/Movies/moviesActions';
import { action } from 'typesafe-actions';

export const FETCH_SHOWS = 'FETCH_SHOWS';
export const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS';
export const FETCH_SHOWS_FAILED = 'FETCH_SHOWS_FAILED';
export const FETCH_SHOW = 'FETCH_SHOW';
export const FETCH_SHOW_SUCCESS = 'FETCH_SHOW_SUCCESS';
export const FETCH_SHOW_FAILED = 'FETCH_SHOW_FAILED';
export const FETCH_SHOWS_BY_PAGE = 'FETCH_SHOWS_BY_PAGE';
export const FETCH_SHOWS_BY_PAGE_SUCCESS = 'FETCH_SHOWS_BY_PAGE_SUCCESS';
export const FETCH_SHOWS_BY_PAGE_FAILED = 'FETCH_SHOWS_BY_PAGE_FAILED';
export const FILTER_SHOWS = 'FILTER_SHOWS';
export const FETCH_SHOW_ACCOUNT_STATES = 'FETCH_SHOW_ACCOUNT_STATES';
export const FETCH_SHOW_ACCOUNT_STATES_SUCCESS = 'FETCH_SHOW_ACCOUNT_STATES_SUCCESS';
export const FETCH_SHOW_ACCOUNT_STATES_FAILED = 'FETCH_SHOW_ACCOUNT_STATES_FAILED';

export const showsActions = {
  fetchShows: () => action(FETCH_SHOWS),
  fetchShowsSuccess: ([populars, topRateds, onTheAirs, airingTodays]: TvShow[][]) => action(FETCH_SHOWS_SUCCESS, {
    populars,
    topRateds,
    onTheAirs,
    airingTodays
  }),
  fetchShowsFailed: () => action(FETCH_SHOWS_FAILED),
  fetchShow: (id: number) => action(FETCH_SHOW, { id }),
  fetchShowSuccess: (show: TvShowDetail) => action(FETCH_SHOW_SUCCESS, { show }),
  fetchShowFailed: () => action(FETCH_SHOW_FAILED),
  fetchShowsByPage: (type: ShowEndpointsPath, page: number) => action(FETCH_SHOWS_BY_PAGE, { type, page }),
  fetchShowsByPageSuccess: (type: ShowEndpointsPath, shows: TvShow[]) => action(FETCH_SHOWS_BY_PAGE_SUCCESS, {
    type,
    shows
  }),
  fetchShowsByPageFailed: () => action(FETCH_SHOWS_BY_PAGE_FAILED),
  filterShows: (type: ShowEndpointsPath, query: string) => action(FILTER_SHOWS, { type, query }),
  fetchShowAccountStates: (id: number) => action(FETCH_SHOW_ACCOUNT_STATES, { id }),
  fetchShowAccountStatesSuccess: (accountState: AccountState) => action(FETCH_SHOW_ACCOUNT_STATES_SUCCESS,
    { accountState }),
  fetchShowAccountStatesFailed: () => action(FETCH_SHOW_ACCOUNT_STATES_FAILED)
};
