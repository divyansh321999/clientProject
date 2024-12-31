import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const checkUserLoggedIn = createAsyncThunk(
  'user/checkLoggedIn',
  async () => {
    const res = await fetch('/api/user/test', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const result = await res.json();
    return result.isLoggedIn; 
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => {
    const res = await fetch('/api/user/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return res.ok; 
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      console.log(action.payload)
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserLoggedIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserLoggedIn.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload;
        state.loading = false;
      })
      .addCase(checkUserLoggedIn.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setIsLoggedIn } = userSlice.actions;
export default userSlice.reducer;
