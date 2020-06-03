import TextField from '@material-ui/core/TextField';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import styles from '../AddUserModal/AddUserModal.module.scss';

const ValidatedTextField = props => {
  const [isError, setError] = useState(false);
  const { validator, onChange } = props;

  const onChangeCallback = useCallback(
    event => {
      const { value } = event.target;
      const isInvalid = !validator(value);

      setError(isInvalid);
      onChange({ value, isInvalid });
    },
    [onChange, validator],
  );

  return (
    <TextField
      fullWidth
      value={props.value}
      error={isError}
      helperText={isError ? props.helperText || 'Incorrect value' : ''}
      className={styles.textField}
      label={props.label}
      variant="outlined"
      onChange={onChangeCallback}
      onBlur={onChangeCallback}
    />
  );
};

ValidatedTextField.propTypes = {
  label: PropTypes.string,
  helperText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  validator: PropTypes.func.isRequired,
};

export { ValidatedTextField };
