import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { createRootReducer } from './createRootReducer';

export const initStore = () => {
  const history = createBrowserHistory();

  const store = configureStore({
    reducer: createRootReducer(history),
    middleware: [routerMiddleware(history), ...getDefaultMiddleware()],
  });

  return { history, store };
};
