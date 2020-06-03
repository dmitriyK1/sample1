import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import './styles/index.css';
import { App } from './modules/app/components/App';
import { initStore } from './createStore';

const { history, store } = initStore();

ReactDOM.render(
  <App history={history} store={store} />,
  document.getElementById('root'),
);
