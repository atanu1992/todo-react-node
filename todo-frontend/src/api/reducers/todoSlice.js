import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import errorHandler from '../errorHandler';
import api from '../api';

export const addTodo = createAsyncThunk(
  'todo/add',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('/todo/add', userInput);
      if (response.status === 201 && response?.data?.details) {
        return response.data.details;
      } else {
        throw Error('Failed to add todo');
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

export const todosList = createAsyncThunk(
  'todo/list',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/todos');
      if (response.status === 200 && response?.data?.details) {
        return response.data.details;
      } else {
        throw Error('Failed to fetch todos');
      }
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const toggleTodoCompleteStatus = createAsyncThunk(
  'todo/update/completeStatus',
  async ({ todoId, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/todo/update-complete-status/${todoId}`,
        {
          completed: status,
        }
      );
      if (response.status === 200 && response?.data?.details) {
        return response.data.details;
      } else {
        throw Error('Failed to update todo');
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

export const updateTodo = createAsyncThunk(
  'todo/update',
  async ({ editTodo, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/todo/${editTodo}`, data);
      if (response.status === 200 && response?.data?.details) {
        return response.data.details;
      } else {
        throw Error('Failed to update todo');
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

export const removeTodo = createAsyncThunk(
  'todo/remove',
  async (todoId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/todo/${todoId}`);
      if (response.status === 200) {
        return { todoId: todoId };
      } else {
        throw Error('Failed to update todo');
      }
    } catch (err) {
      let errors = errorHandler(err);
      return rejectWithValue(errors);
    }
  }
);

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    loading: false,
    error: null,
    todos: [],
    currentTodo: [],
  },
  reducers: {
    getCurrentTodo: (state, action) => {
      state.currentTodo = state.todos.filter((v) => v.id === action.payload);
    },
    clearCurrentTodo: (state) => {
      state.currentTodo = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentTodo = [];
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.unshift(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      })
      .addCase(todosList.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentTodo = [];
      })
      .addCase(todosList.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(todosList.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      })
      .addCase(toggleTodoCompleteStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTodoCompleteStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        state.todos = state.todos.map((value) => {
          return value.id === id ? action.payload : value;
        });
      })
      .addCase(toggleTodoCompleteStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const { id } = action.payload;
        state.todos = state.todos.map((value) => {
          return value.id === id ? action.payload : value;
        });
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      })
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        const { todoId } = action.payload;
        state.todos = state.todos.filter((value) => value.id !== todoId);
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.message
          ? action.payload.message
          : action.error.message;
      });
  },
});

export const { getCurrentTodo, clearCurrentTodo } = todoSlice.actions;

export default todoSlice.reducer;
