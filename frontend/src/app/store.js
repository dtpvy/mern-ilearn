import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from 'features/Auth/AuthSlice';
import DashboardReducer from 'features/DashBoard/DashboardSlice';

const rootReducer = {
  auth: AuthReducer,
  dashboard: DashboardReducer
}

const store = configureStore({
  reducer: rootReducer
})

export default store;