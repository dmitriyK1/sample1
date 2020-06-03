import { createSlice } from '@reduxjs/toolkit';

export const modalsStatePath = 'modals';

const initialState = {
  modalType: null,
  modalData: null,
};

export const modalsSlice = createSlice({
  name: modalsStatePath,
  initialState,
  reducers: {
    showModal(state, action) {
      return {
        ...state,
        modalType: action.payload.modalType,
        modalData: action.payload.modalData,
      };
    },

    hideModals() {
      return initialState;
    },
  },
});

export const modalTypeSelector = state => state[modalsStatePath].modalType;
export const modalDataSelector = state => state[modalsStatePath].modalData;
