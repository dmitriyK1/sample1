import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { parseTimeStamp } from '../../../common/utils/parseTimeStamp';
import styles from './Time.module.scss';

const Time = memo(props => {
  const date = parseTimeStamp(props.timeStamp);

  return (
    <span>
      {date.day} {date.month}, {date.time}{' '}
      <span className={styles.year}>({date.year})</span>
    </span>
  );
});

Time.propTypes = {
  timeStamp: PropTypes.number,
};

export { Time };
