import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './store';
import { Provider } from 'react-redux';
import config from './config';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>    
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
