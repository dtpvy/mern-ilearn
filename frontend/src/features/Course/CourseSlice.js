import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrl } from 'app/constants';
import axios from 'axios';

const initialState = {
  error: '',
  message: '',
  hashtags: [],
  courses: [],
  isLoading: false
};


export const show = createAsyncThunk(
  'course/show',
  async (type, sort) => {
    const response = await axios.get(`${apiUrl}/courses/`);
    const { success, message, courses } = response.data;
    return { error: !success, message, courses };
  }
);

export const showOne = createAsyncThunk(
  'course/showOne',
  async (id) => {
    const response = await axios.get(`${apiUrl}/courses/${id}`);
    const { success, message, course } = response.data;
    return { error: !success, message, courses: course };
  }
);

export const addCourse = createAsyncThunk(
  'course/addCourse',
  async (values) => {
    const response = await axios.post(`${apiUrl}/courses/add`, values);
    const { success, message, course } = response.data;
    return { error: !success, message, courses: course };
  }
);

export const editCourse = createAsyncThunk(
  'course/editCourse',
  async (values) => {
    console.log(values);
    const response = await axios.put(`${apiUrl}/courses/${values._id}/edit`, values);
    const { success, message, course } = response.data;
    return { error: !success, message, courses: course };
  }
);

// export const deleteCourse = createAsyncThunk(
//   'course/deleteCourse',
//   async () => {
//     const response = await axios.get(`${apiUrl}/courses/:id/edit`);
//     const { success, message } = response.data;
//     return { error: !success, message };
//   }
// );

// export const deleteComment = createAsyncThunk(
//   'course/deleteCourse',
//   async () => {
//     const response = await axios.get(`${apiUrl}/courses/:id/edit`);
//     const { success, message } = response.data;
//     return { error: !success, message };
//   }
// );

const course = createSlice({
  name: 'course',
  initialState: initialState,
  reducers: {
    filter: (state, action) => {
      state.courses = action.payload;
    }
  },
  extraReducers: {
    [show.pending]: (state) => {
      state.isLoading = true;
    },
    [show.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [show.fulfilled]: (state, action) => {
      const newState = {
        ...state,
        ...action.payload,
        isLoading: false
      };
      return newState;
    },
    [showOne.pending]: (state) => {
      state.isLoading = true;
    },
    [showOne.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [showOne.fulfilled]: (state, action) => {
      const newState = {
        ...state,
        ...action.payload,
        isLoading: false
      };
      return newState;
    },
    [addCourse.pending]: (state) => {
      state.isLoading = true;
    },
    [addCourse.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [addCourse.fulfilled]: (state, action) => {
      const newState = {
        ...state,
        ...action.payload,
        isLoading: false
      };
      return newState;
    },
    [editCourse.pending]: (state) => {
      state.isLoading = true;
    },
    [editCourse.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [editCourse.fulfilled]: (state, action) => {
      const newState = {
        ...state,
        ...action.payload,
        isLoading: false
      };
      return newState;
    }
  }
});

const { reducer } = course;
// const { filter } = actions;
export default reducer;
