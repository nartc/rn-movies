import { rootEpic, rootReducer } from '@store/root';
import { Middleware, StoreEnhancer, applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = (initialState?: AppState) => {
  const epicMiddleware = createEpicMiddleware();
  const middlewares: Middleware[] = [epicMiddleware];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  const middlewareEnhancer: StoreEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, initialState, compose(middlewareEnhancer));

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
