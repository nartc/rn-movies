import { TvShow } from '@api/Models';
import { action } from 'typesafe-actions';

export const FETCH_SHOWS = 'FETCH_SHOWS';
export const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS';
export const FETCH_SHOWS_FAILED = 'FETCH_SHOWS_FAILED';

export const showsActions = {
  fetchShows: () => action(FETCH_SHOWS),
  fetchShowsSuccess: ([populars, topRateds, onTheAirs, airingTodays]: TvShow[][]) => action(FETCH_SHOWS_SUCCESS, {
    populars,
    topRateds,
    onTheAirs,
    airingTodays
  }),
  fetchShowsFailed: () => action(FETCH_SHOWS_FAILED)
};
