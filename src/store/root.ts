import { configurationEpics } from '@store/Configurations/configurationEpics';
import { configurationReducer } from '@store/Configurations/configurationReducer';
import { moviesEpics } from '@store/Movies/moviesEpics';
import { moviesReducer } from '@store/Movies/moviesReducer';
import { showsEpics } from '@store/Shows/showsEpics';
import { showsReducer } from '@store/Shows/showsReducer';
import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

export const rootReducer = combineReducers({
  moviesState: moviesReducer,
  configurationState: configurationReducer,
  showsState: showsReducer
});

export const rootEpic = combineEpics(...moviesEpics, ...configurationEpics, ...showsEpics);
