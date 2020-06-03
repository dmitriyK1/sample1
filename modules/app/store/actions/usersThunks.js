import {
  showErrorModalAction,
  showErrorNotificationAction,
  showSuccessNotificationAction,
} from '../../../common/store/actions';
import * as api from '../../api';
import { networkErrorMessages } from '../../api/constants/networkErrorMessages';
import { successMessages } from '../../api/constants/successMessages';
import { mapUsersFromApi } from '../../api/dataMappers/mapUsersFromApi';
import { getErrorMessage } from '../../api/utils/getErrorMessage';
import { isApiError } from '../../api/utils/isApiError';
import { usersSlice } from '../reducers/usersSlice';

const { actions } = usersSlice;

export const getUsersThunk = (options = {}) => async dispatch => {
  try {
    const usersData = await api.getAllUsers(options.pagination);
    const action = options.incrementalLoad
      ? actions.getUsersIncremental
      : actions.getUsers;

    if (isApiError(usersData)) {
      dispatch(showErrorNotificationAction(getErrorMessage(usersData)));
      return;
    }

    dispatch(action(mapUsersFromApi(usersData)));
  } catch (error) {
    dispatch(showErrorModalAction({ message: getErrorMessage(error) }));
  }
};

export const createUserThunk = newUserData => async dispatch => {
  try {
    const userId = await api.createUser(newUserData);

    if (isApiError(userId)) {
      dispatch(showErrorNotificationAction(getErrorMessage(userId)));
      return;
    }

    const newUser = await api.getSingleUser(userId);
    dispatch(actions.createUser(newUser));
    dispatch(showSuccessNotificationAction(successMessages.USER_CREATED));
  } catch (error) {
    dispatch(showErrorModalAction({ message: getErrorMessage(error) }));
  }
};

export const deleteUserThunk = userIds => async dispatch => {
  try {
    const result = await Promise.all(userIds.map(id => api.deleteUser(id)));

    if (isApiError(result)) {
      const errorMessage = result.length
        ? networkErrorMessages.USER_DELETE
        : getErrorMessage(result);

      dispatch(showErrorNotificationAction(errorMessage));
      return;
    }

    dispatch(actions.deleteUser(userIds));
    dispatch(showSuccessNotificationAction(successMessages.USER_DELETED));
  } catch (error) {
    dispatch(showErrorModalAction({ message: getErrorMessage(error) }));
  }
};

export const updateUserThunk = updatedUser => async dispatch => {
  try {
    const result = await api.updateUser(updatedUser);

    if (isApiError(result)) {
      dispatch(showErrorNotificationAction(getErrorMessage(result)));
      return;
    }

    const user = await api.getSingleUser(updatedUser.userid);
    dispatch(actions.updateUser(user));

    dispatch(showSuccessNotificationAction(successMessages.USER_UPDATED));
  } catch (error) {
    dispatch(showErrorModalAction({ message: getErrorMessage(error) }));
  }
};
