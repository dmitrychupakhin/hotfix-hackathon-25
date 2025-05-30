import { createSlice } from '@reduxjs/toolkit';

export const globalLoaderSlice = createSlice({
  name: 'globalLoader',
  initialState: {
    isLoading: 0,
  },
  reducers: {
    showLoader: (state) => {
      return {
        isLoading: state.isLoading + 1,
      };
    },
    hideLoader: (state) => {
      return {
        // isLoading: Math.max(state.isLoading - 1, 0),
        isLoading: state.isLoading - 1,
      };
    },
  },
});

export const { showLoader, hideLoader } = globalLoaderSlice.actions;
export const globalLoaderReducer = globalLoaderSlice.reducer;
