import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import errorHandler from '../errorHandler';

export const login = createAsyncThunk(
  'auth/login',
  async ({ userInput }, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/login', userInput);
      if (response.status === 200 && response?.data?.details) {
        return response.data.details;
      } else {
        throw Error('Invalid Credentials');
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ userInput }, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/register', userInput);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    error: null,
    loading: false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.loading = false;
        state.user = user;
        state.token = token;
        state.error = null;
        localStorage.setItem('userToken', token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      });
  },
});

export default authSlice.reducer;
