import { modalTypes } from '../../constants/modalTypes';
import { modalsSlice } from '../../../common/store/modalsSlice';

const { actions: modalActions } = modalsSlice;

export const showAddUserModalAction = () =>
  modalActions.showModal({
    modalType: modalTypes.ADD_USER_MODAL,
  });

export const showUpdateUserModalAction = user =>
  modalActions.showModal({
    modalType: modalTypes.UPDATE_USER_MODAL,
    modalData: user,
  });

export const showDeleteUserModalAction = (userIds, onDeleteCallback) =>
  modalActions.showModal({
    modalType: modalTypes.DELETE_USER_MODAL,
    modalData: {
      onDeleteCallback,
      userIds,
    },
  });
