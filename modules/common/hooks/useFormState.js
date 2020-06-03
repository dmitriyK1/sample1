import { useState } from 'react';

export const useFormState = initialState => {
  const [formState, setFormState] = useState(initialState);
  const [validityMap, setValidityMap] = useState({});
  const hasErrors = Object.values(validityMap).some(Boolean);

  const setFieldValue = ({ field, value, isInvalid }) => {
    setValidityMap({ ...validityMap, [field]: isInvalid });

    setFormState({
      ...formState,
      [field]: value,
    });
  };

  return [formState, hasErrors, setFieldValue];
};
