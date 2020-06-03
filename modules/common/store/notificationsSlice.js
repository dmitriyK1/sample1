import { createSlice } from '@reduxjs/toolkit';

export const notificationStatePath = 'notifications';

const initialState = {
  notificationType: null,
  message: null,
};

export const notificationsSlice = createSlice({
  name: notificationStatePath,
  initialState,
  reducers: {
    showNotification(state, action) {
      return {
        ...state,
        notificationType: action.payload.notificationType,
        message: action.payload.message,
      };
    },

    hideNotifications(state) {
      return {
        ...state,
        notificationType: initialState.notificationType,
      };
    },
  },
});

export const notificationTypeSelector = state =>
  state[notificationStatePath].notificationType;

export const notificationMessageSelector = state =>
  state[notificationStatePath].message;
