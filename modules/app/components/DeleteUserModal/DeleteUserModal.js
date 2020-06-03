import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { StyledModal } from '../../../common/components/StyledModal';
import styles from './DeleteUserModal.module.scss';
import { deleteUserThunk } from '../../store/actions/usersThunks';

const { arrayOf, string, shape, func } = PropTypes;

const DeleteUserModal = props => {
  const { modalData, onClose } = props;
  const dispatch = useDispatch();
  const onDelete = useCallback(() => {
    dispatch(deleteUserThunk(modalData.userIds)).then(
      modalData.onDeleteCallback,
    );
    onClose();
  }, [dispatch, modalData.userIds, onClose, modalData.onDeleteCallback]);

  return (
    <StyledModal title="Delete selected user(s)?">
      <div className={styles.buttons}>
        <Button onClick={props.onClose} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={onDelete}
          className={styles.okButton}
          color="primary"
          variant="contained"
        >
          Delete
        </Button>
      </div>
    </StyledModal>
  );
};

DeleteUserModal.propTypes = {
  modalData: shape({
    onDeleteCallback: func.isRequired,
    userIds: arrayOf(string),
  }),
  onClose: func.isRequired,
};

export { DeleteUserModal };
