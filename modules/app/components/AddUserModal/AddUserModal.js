import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { StyledModal } from '../../../common/components/StyledModal';
import { useFormState } from '../../../common/hooks/useFormState';
import { hasFalsyValues } from '../../../common/utils/hasFalsyValues';
import {
  emailValidator,
  nameValidator,
} from '../../../common/utils/validators';
import { ValidatedTextField } from '../ValidatedTextField';
import styles from './AddUserModal.module.scss';
import { createUserThunk } from '../../store/actions/usersThunks';

const AddUserModal = props => {
  const dispatch = useDispatch();
  const [formState, hasErrors, setFieldValue] = useFormState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const onSave = useCallback(() => {
    dispatch(createUserThunk(formState));
    props.onClose();
  }, [dispatch, formState, props]);

  const setFirstName = useCallback(
    ({ value, isInvalid }) => {
      setFieldValue({ field: 'firstName', value, isInvalid });
    },
    [setFieldValue],
  );

  const setLastName = useCallback(
    ({ value, isInvalid }) => {
      setFieldValue({ field: 'lastName', value, isInvalid });
    },
    [setFieldValue],
  );

  const setEmail = useCallback(
    ({ value, isInvalid }) => {
      setFieldValue({ field: 'email', value, isInvalid });
    },
    [setFieldValue],
  );

  return (
    <StyledModal title="Add User">
      <form noValidate autoComplete="off">
        <ValidatedTextField
          label="First name"
          validator={nameValidator}
          onChange={setFirstName}
        />
        <ValidatedTextField
          label="Last name"
          validator={nameValidator}
          onChange={setLastName}
        />
        <ValidatedTextField
          helperText="Incorrect email"
          label="Email"
          validator={emailValidator}
          onChange={setEmail}
        />
      </form>
      <div className={styles.buttons}>
        <Button onClick={props.onClose} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={onSave}
          disabled={hasErrors || hasFalsyValues(formState)}
          className={styles.okButton}
          color="primary"
          variant="contained"
        >
          Save
        </Button>
      </div>
    </StyledModal>
  );
};

AddUserModal.propTypes = {
  modalData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export { AddUserModal };
