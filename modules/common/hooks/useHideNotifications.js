import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { notificationsSlice } from '../store/notificationsSlice';

const { actions } = notificationsSlice;

export const useHideNotifications = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(actions.hideNotifications());
  }, [dispatch]);
};
