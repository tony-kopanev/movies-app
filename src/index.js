import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import rootReducer from './store/rootReducer';
import './index.scss';

const store = createStore(
  rootReducer,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeWithDevTools()
  );

  //https://github.com/zalmoxisus/redux-devtools-extension#usage


// console.log('[store]', store);
// console.log('[store.getState()]', store.getState());
// store.dispatch({ type: 'CHANGE_NAME', name: 'vasa' })
// console.log('[store.getState()]', store.getState());

const app = (
  <Provider store = {store}>
    <BrowserRouter>
      <App hello />
    </BrowserRouter>
  </Provider>
  );

ReactDOM.render(app, document.getElementById('root'));
