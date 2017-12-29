import jquery from 'jquery/dist/jquery.min.js';
import popperJS from 'popper.js';
import boostrapCSS from 'bootstrap/dist/css/bootstrap.min.css';
import boostrapJS from 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import bodyCSS from './style/body.css';

import reducers from './reducers';
import App from './components/App';

import axios from 'axios';

window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);
