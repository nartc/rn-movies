import { combineReducers } from 'redux';
import { moviesReducer } from './Movies/moviesReducer';
import { combineEpics } from 'redux-observable';
import { moviesEpics } from './Movies/moviesEpics';

export const rootReducer = combineReducers({
  moviesState: moviesReducer
});

export const rootEpic = combineEpics(...moviesEpics);
