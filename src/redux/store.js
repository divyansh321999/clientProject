import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notifySlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer
  },
});

export default store;
