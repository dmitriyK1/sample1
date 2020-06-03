import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';

import { StyledModal } from '../StyledModal';
import styles from './ErrorModal.module.scss';

const ErrorModal = props => {
  return (
    <StyledModal title="Error">
      <div className={styles.content}>
        <p>{props.modalData.message}</p>
        <Button color="secondary" variant="contained" onClick={props.onClose}>
          Close
        </Button>
      </div>
    </StyledModal>
  );
};

ErrorModal.propTypes = {
  modalData: PropTypes.shape({
    message: PropTypes.string,
  }),
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export { ErrorModal };
