import React from 'react';
import PropTypes from 'prop-types';

import styles from './LoadingView.module.scss';

const LoadingView = ({ isVisible = true }) => (
  <div className={styles.container}>
    <div className={isVisible ? styles.visible : styles.hidden}>
      <div className={styles.circle} />
    </div>
  </div>
);

LoadingView.propTypes = {
  isVisible: PropTypes.bool,
};

LoadingView.defaultProps = {
  isVisible: true,
};

export { LoadingView };
