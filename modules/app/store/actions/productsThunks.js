import * as api from '../../api';
import { mapUsersFromApi } from '../../api/dataMappers/mapUsersFromApi';
import { isApiError } from '../../api/utils/isApiError';
import {
  showErrorModalAction,
  showErrorNotificationAction,
} from '../../../common/store/actions';
import { getErrorMessage } from '../../api/utils/getErrorMessage';
import { productsSlice } from '../reducers/productsSlice';

const { actions } = productsSlice;

export const getProductsThunk = (options = {}) => async dispatch => {
  try {
    const productsData = await api.getAllProducts(options.pagination);
    const action = options.incrementalLoad
      ? actions.getProductsIncremental
      : actions.getProducts;

    if (isApiError(productsData)) {
      dispatch(showErrorNotificationAction(getErrorMessage(productsData)));
      return;
    }

    dispatch(action(mapUsersFromApi(productsData)));
  } catch (error) {
    dispatch(showErrorModalAction({ message: getErrorMessage(error) }));
  }
};
