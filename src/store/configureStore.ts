import { rootEpic, rootReducer } from '@store/root';
import { Middleware, StoreEnhancer, applyMiddleware, createStore, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = (initialState?: AppState) => {
  const epicMiddleware = createEpicMiddleware();
  const middlewares: Middleware[] = [epicMiddleware];

  const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

  const middlewareEnhancer: StoreEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, initialState, composeEnhancers(middlewareEnhancer));

  epicMiddleware.run(rootEpic);

  return store;
};

export default configureStore;
