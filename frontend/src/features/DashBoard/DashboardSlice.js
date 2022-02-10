import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from 'app/constants';
import axios from 'axios';
import setAuthToken from 'utils/setAuthToken';
import { NUM_OF_DASHBOARD_SLIDER } from 'constants/globle';

const initialState = {
  error: '',
  message: '',
  courses: [],
  posts: [],
  isLoading: false
};


export const courses = createAsyncThunk(
  'dashboard/courses',
  async () => {
    const response = await axios.get(`${apiUrl}/courses/home/${NUM_OF_DASHBOARD_SLIDER}`);
    const { success, message, courses } = response.data;
    return { error: !success, message, courses };
  }
);

const course = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
  },
  extraReducers: {
    [courses.pending]: (state) => {
      state.isLoading = true;
    },
    [courses.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [courses.fulfilled]: (state, action) => {
      const newState = {
        ...state,
        ...action.payload,
        isLoading: false
      };
      return newState;
    }
  }
});

const { reducer, actions } = course;
export default reducer;
