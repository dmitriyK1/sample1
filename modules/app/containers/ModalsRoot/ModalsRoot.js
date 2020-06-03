import React from 'react';
import { useSelector } from 'react-redux';

import { ErrorModal } from '../../../common/components/ErrorModal';
import { commonModalTypes } from '../../../common/constants/commonModalTypes';
import { useHideModals } from '../../../common/hooks/useHideModals';
import {
  modalDataSelector,
  modalTypeSelector,
} from '../../../common/store/modalsSlice';
import { AddUserModal } from '../../components/AddUserModal';
import { DeleteUserModal } from '../../components/DeleteUserModal';
import { UpdateUserModal } from '../../components/UpdateUserModal';
import { modalTypes } from '../../constants/modalTypes';

const modalTypeToComponentMap = {
  [modalTypes.ADD_USER_MODAL]: AddUserModal,
  [modalTypes.UPDATE_USER_MODAL]: UpdateUserModal,
  [modalTypes.DELETE_USER_MODAL]: DeleteUserModal,
  [commonModalTypes.ERROR_MODAL]: ErrorModal,
};

export const ModalsRoot = () => {
  const modalType = useSelector(modalTypeSelector);
  const modalData = useSelector(modalDataSelector);
  const onClose = useHideModals();
  const ModalComponent = modalTypeToComponentMap[modalType];

  return ModalComponent ? (
    <ModalComponent modalData={modalData} onClose={onClose} />
  ) : null;
};
