import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { queryReducer } from './reducers/reducers.js';

import Dashboard from './components/Dashboard';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(queryReducer)}>
    <Dashboard />
  </Provider>,
  document.getElementById('root')
);
