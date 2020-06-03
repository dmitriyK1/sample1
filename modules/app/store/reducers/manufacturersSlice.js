import { createSlice } from '@reduxjs/toolkit';

export const manufacturersStatePath = 'manufacturers';

export const manufacturersSlice = createSlice({
  name: manufacturersStatePath,
  initialState: {
    totalCount: null,
    items: null,
  },
  reducers: {
    getManufacturers(state, action) {
      return {
        ...state,
        totalCount: action.payload.totalCount,
        items: action.payload.items,
      };
    },

    getManufacturersIncremental(state, action) {
      return {
        ...state,
        totalCount: action.payload.totalCount,
        items: [...state.items, ...action.payload.items],
      };
    },
  },
});

export const getAllManufacturersSelector = state =>
  state[manufacturersStatePath].items;

export const getManufacturersTotalCountSelector = state =>
  state[manufacturersStatePath].totalCount;
