import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import App from './App';
import rootReducer from './store/rootReducer';
import './index.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
  );

  //https://github.com/zalmoxisus/redux-devtools-extension#usage

const app = (
  <Provider store = {store}>
    <BrowserRouter>
      <App hello />
    </BrowserRouter>
  </Provider>
  );

ReactDOM.render(app, document.getElementById('root'));
