import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { StyledModal } from '../../../common/components/StyledModal';
import { useFormState } from '../../../common/hooks/useFormState';
import { hasFalsyValues } from '../../../common/utils/hasFalsyValues';
import {
  emailValidator,
  nameValidator,
} from '../../../common/utils/validators';
import { updateUserThunk } from '../../store/actions/usersThunks';
import { ValidatedTextField } from '../ValidatedTextField';
import styles from './UpdateUserModal.module.scss';

const UpdateUserModal = props => {
  const { modalData, onClose } = props;
  const dispatch = useDispatch();
  const [isPristine, setPristine] = useState(true);
  const [formState, hasErrors, setFieldValue] = useFormState({
    firstName: modalData.firstName,
    lastName: modalData.lastName,
    email: modalData.email,
  });

  const onEdit = useCallback(
    () =>
      dispatch(
        updateUserThunk({
          ...formState,
          userid: modalData.id,
        }),
      ).then(onClose),
    [dispatch, formState, modalData.id, onClose],
  );

  const setFirstName = useCallback(
    ({ value, isInvalid }) => {
      setFieldValue({ field: 'firstName', value, isInvalid });
      setPristine(false);
    },
    [setFieldValue],
  );

  const setLastName = useCallback(
    ({ value, isInvalid }) => {
      setFieldValue({ field: 'lastName', value, isInvalid });
      setPristine(false);
    },
    [setFieldValue],
  );

  const setEmail = useCallback(
    ({ value, isInvalid }) => {
      setFieldValue({ field: 'email', value, isInvalid });
      setPristine(false);
    },
    [setFieldValue],
  );

  return (
    <StyledModal title="Update User">
      <form noValidate autoComplete="off">
        <ValidatedTextField
          value={formState.firstName}
          label="First name"
          validator={nameValidator}
          onChange={setFirstName}
        />
        <ValidatedTextField
          value={formState.lastName}
          label="Last name"
          validator={nameValidator}
          onChange={setLastName}
        />
        <ValidatedTextField
          value={formState.email}
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
          onClick={onEdit}
          disabled={isPristine || hasErrors || hasFalsyValues(formState)}
          className={styles.okButton}
          color="primary"
          variant="contained"
        >
          Update
        </Button>
      </div>
    </StyledModal>
  );
};

UpdateUserModal.propTypes = {
  modalData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export { UpdateUserModal };
