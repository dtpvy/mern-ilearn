import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from 'features/Auth/AuthSlice';
import DashboardReducer from 'features/DashBoard/DashboardSlice';
import CourseReducer from 'features/Course/CourseSlice';

const rootReducer = {
  auth: AuthReducer,
  dashboard: DashboardReducer,
  course: CourseReducer
}

const store = configureStore({
  reducer: rootReducer
})

export default store;