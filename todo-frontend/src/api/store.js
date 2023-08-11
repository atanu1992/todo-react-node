import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './reducers/AuthSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
  devTools: true,
});
