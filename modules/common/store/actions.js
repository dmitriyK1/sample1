import { commonModalTypes } from '../constants/commonModalTypes';
import { commonNotificationTypes } from '../constants/commonNotificationTypes';
import { modalsSlice } from './modalsSlice';
import { notificationsSlice } from './notificationsSlice';

const { actions: modalActions } = modalsSlice;
const { actions: notificationActions } = notificationsSlice;

export const showErrorModalAction = modalData =>
  modalActions.showModal({
    modalType: commonModalTypes.ERROR_MODAL,
    modalData,
  });

export const showErrorNotificationAction = message =>
  notificationActions.showNotification({
    notificationType: commonNotificationTypes.ERROR_NOTIFICATION,
    message,
  });

export const showSuccessNotificationAction = message =>
  notificationActions.showNotification({
    notificationType: commonNotificationTypes.SUCCESS_NOTIFICATION,
    message,
  });
