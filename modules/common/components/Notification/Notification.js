import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';

import { commonNotificationTypes } from '../../constants/commonNotificationTypes';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Alert = props => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const notificationTypeToSeverityMap = {
  [commonNotificationTypes.SUCCESS_NOTIFICATION]: 'success',
  [commonNotificationTypes.ERROR_NOTIFICATION]: 'error',
};

const Notification = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        autoHideDuration={3000}
        open={props.isOpen}
        onClose={props.onClose}
      >
        <Alert severity={notificationTypeToSeverityMap[props.type]}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

Notification.propTypes = {
  isOpen: PropTypes.bool,
  message: PropTypes.string,
  type: PropTypes.oneOf(Object.values(commonNotificationTypes)),
  onClose: PropTypes.func.isRequired,
};

export { Notification };
