import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import rootReducer from '../../reducers';
import rootSaga from '../../sagas';

const sagaMiddleWare = createSagaMiddleWare();

const configureStore = () => {
  const preloadedState = window.PRELOADED_STATE;
  const middlewares = [
    sagaMiddleWare
  ];
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(applyMiddleware(...middlewares))
  );
  sagaMiddleWare.run(rootSaga);
  return store;
};

export default configureStore;
