import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleWare from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleWare = createSagaMiddleWare();
const history = createBrowserHistory();

const configureStore = (initialState) => {
  const middlewares = [sagaMiddleWare, routerMiddleware(history)];
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    compose(applyMiddleware(...middlewares)),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement from reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = connectRouter(history)(rootReducer); // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleWare.run(rootSaga);
  return store;
};

export default configureStore;
