import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from 'app/constants';
import axios from 'axios';
import setAuthToken from 'utils/setAuthToken';
import { NUM_OF_DASHBOARD_SLIDER } from 'constants/globle';

const initialState = {
  error: '',
  message: '',
  post: false,
  items: [],
  isLoading: false
};


export const dashboard = createAsyncThunk(
  'course/dashboard',
  async () => {
    const response = await axios.get(`${apiUrl}/courses/home/${NUM_OF_DASHBOARD_SLIDER}`);
    const { success, message, courses } = response.data;
    return { error: !success, message, items: courses };
  }
);

const course = createSlice({
  name: 'course',
  initialState: initialState,
  reducers: {
  },
  extraReducers: {
    [dashboard.pending]: (state) => {
      state.isLoading = true;
    },
    [dashboard.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [dashboard.fulfilled]: (state, action) => {
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
