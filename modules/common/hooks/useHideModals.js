import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { modalsSlice } from '../store/modalsSlice';
const { actions } = modalsSlice;

export const useHideModals = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(actions.hideModals());
  }, [dispatch]);
};
