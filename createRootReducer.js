import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { modalsSlice } from './modules/common/store/modalsSlice';
import { notificationsSlice } from './modules/common/store/notificationsSlice';
import { usersSlice } from './modules/app/store/reducers/usersSlice';
import { productsSlice } from './modules/app/store/reducers/productsSlice';
import { manufacturersSlice } from './modules/app/store/reducers/manufacturersSlice';

export const createRootReducer = history => {
  return combineReducers({
    [modalsSlice.name]: modalsSlice.reducer,
    [notificationsSlice.name]: notificationsSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
    [productsSlice.name]: productsSlice.reducer,
    [manufacturersSlice.name]: manufacturersSlice.reducer,
    router: connectRouter(history),
  });
};
