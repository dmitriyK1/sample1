import { createSlice } from '@reduxjs/toolkit';

export const usersStatePath = 'users';

export const usersSlice = createSlice({
  name: usersStatePath,
  initialState: {
    totalCount: null,
    items: null,
  },
  reducers: {
    getUsers(state, action) {
      return {
        ...state,
        totalCount: action.payload.totalCount,
        items: action.payload.items,
      };
    },

    getUsersIncremental(state, action) {
      return {
        ...state,
        totalCount: action.payload.totalCount,
        items: [...state.items, ...action.payload.items],
      };
    },

    createUser(state, action) {
      return {
        ...state,
        totalCount: state.totalCount + 1,
        items: [action.payload, ...state.items],
      };
    },

    updateUser(state, action) {
      return {
        ...state,
        items: state.items.map(item =>
          item.userid === action.payload.userid
            ? {
                ...item,
                ...action.payload,
              }
            : item,
        ),
      };
    },

    deleteUser(state, action) {
      return {
        ...state,
        totalCount: state.totalCount - action.payload.length,
        items: state.items.filter(
          item => !action.payload.includes(item.userid),
        ),
      };
    },
  },
});

export const getAllUsersSelector = state => state[usersStatePath].items;

export const getUsersTotalCountSelector = state =>
  state[usersStatePath].totalCount;
