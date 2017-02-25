import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { queryReducer } from './reducers/reducers.js';

import Dashboard from './components/Dashboard';

const store = createStore(
  queryReducer,
  applyMiddleware( thunk )
);

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>,
  document.getElementById('root')
);
