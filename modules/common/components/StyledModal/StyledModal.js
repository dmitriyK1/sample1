import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getModalStyle, useStyles } from '../../../../styles/getModalStyles';
import { useHideModals } from '../../../common/hooks/useHideModals';
import styles from './StyledModal.module.scss';

const StyledModal = props => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const onClose = useHideModals();

  return (
    <Modal open onClose={onClose}>
      <div style={modalStyle} className={classes.paper}>
        <h2 className={styles.title}>{props.title}</h2>
        <div>{props.children}</div>
      </div>
    </Modal>
  );
};

StyledModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export { StyledModal };
