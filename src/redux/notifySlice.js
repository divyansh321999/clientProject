import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: "",
};

const notifySlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setNotification } = notifySlice.actions;

export default notifySlice.reducer;
