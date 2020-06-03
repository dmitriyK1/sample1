import {
  showErrorModalAction,
  showErrorNotificationAction,
} from '../../../common/store/actions';
import * as api from '../../api';
import { mapUsersFromApi } from '../../api/dataMappers/mapUsersFromApi';
import { getErrorMessage } from '../../api/utils/getErrorMessage';
import { isApiError } from '../../api/utils/isApiError';
import { manufacturersSlice } from '../reducers/manufacturersSlice';

const { actions } = manufacturersSlice;

export const getManufacturersThunk = (options = {}) => async dispatch => {
  try {
    const manufacturersData = await api.getAllManufacturers(options.pagination);
    const action = options.incrementalLoad
      ? actions.getManufacturersIncremental
      : actions.getManufacturers;

    if (isApiError(manufacturersData)) {
      dispatch(showErrorNotificationAction(getErrorMessage(manufacturersData)));
      return;
    }

    if (manufacturersData.items) {
      dispatch(action(mapUsersFromApi(manufacturersData)));
    }
  } catch (error) {
    dispatch(showErrorModalAction({ message: getErrorMessage(error) }));
  }
};
