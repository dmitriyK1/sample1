import { networkErrorMessages } from '../constants/networkErrorMessages';

export const getErrorMessage = error => {
  switch (error.statuscode) {
    case 400:
      return error.errortext;
    default:
      return networkErrorMessages.GENERIC;
  }
};
