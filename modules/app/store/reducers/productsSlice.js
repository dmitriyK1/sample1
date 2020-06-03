import { createSlice } from '@reduxjs/toolkit';

export const productsStatePath = 'products';

export const productsSlice = createSlice({
  name: productsStatePath,
  initialState: {
    totalCount: null,
    items: null,
  },
  reducers: {
    getProducts(state, action) {
      return {
        ...state,
        totalCount: action.payload.totalCount,
        items: action.payload.items,
      };
    },

    getProductsIncremental(state, action) {
      return {
        ...state,
        totalCount: action.payload.totalCount,
        items: [...state.items, ...action.payload.items],
      };
    },
  },
});

export const getAllProductsSelector = state => state[productsStatePath].items;

export const getProductsTotalCountSelector = state =>
  state[productsStatePath].totalCount;
