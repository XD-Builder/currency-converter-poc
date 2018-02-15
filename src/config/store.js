// From redux, we need these to create a store and set middleware
import { createStore, applyMiddleware } from 'redux';

// We need this logger middleware in development mode
import logger from 'redux-logger';

// This is important. Needed as a middleware for running our root saga.
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

// reducers needed for creating our store so it needs what to do when an action happens
import reducer from '../reducers';

// Create an array of middleware beginning with sagaMiddleware and add logger if dev env.
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

// We create our store with reducer and middlewares
const store = createStore(reducer, applyMiddleware(...middleware));

// Once middleware is applied, we can then run rootSaga
// meaning it will takeEvery action that rootSaga is looking for.
sagaMiddleware.run(rootSaga);

export default store;
