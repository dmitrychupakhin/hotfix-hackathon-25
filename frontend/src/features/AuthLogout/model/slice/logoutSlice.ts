import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const logoutSlice = createSlice({
  name: 'logout',
  initialState: {
    isLoggedOut: false,
  },
  reducers: {
    setIsLoggedOut: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoggedOut: action.payload,
      };
    },
  },
});

export const { setIsLoggedOut } = logoutSlice.actions;
export const logoutReducer = logoutSlice.reducer;
