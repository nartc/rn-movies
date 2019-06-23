import { accountEpics } from '@store/Account/accountEpics';
import { accountReducer } from '@store/Account/accountReducer';
import { authEpics } from '@store/Auth/authEpics';
import { authReducer } from '@store/Auth/authReducer';
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
  showsState: showsReducer,
  authState: authReducer,
  accountState: accountReducer
});

export const rootEpic = combineEpics(...moviesEpics, ...configurationEpics, ...showsEpics, ...authEpics, ...accountEpics);
