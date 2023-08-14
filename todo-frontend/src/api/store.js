import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from './reducers/AuthSlice';
import todoSlice from './reducers/todoSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    todo: todoSlice,
  },
  devTools: import.meta.env.DEV,
});

export default store;
