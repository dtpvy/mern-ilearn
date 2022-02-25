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
  async (values) => {
    let response;
    if (values.search !== '') {
      response = await axios.get(`${apiUrl}/courses?_sort&key=${values.key}&type=${values.type}&_search&name=${values.search}`);
    } else {
      response = await axios.get(`${apiUrl}/courses?_sort&key=${values.key}&type=${values.type}`);
    }
    const { success, courses } = response.data;
    return { error: !success, courses };
  }
);

export const showOne = createAsyncThunk(
  'course/showOne',
  async (id) => {
    const response = await axios.get(`${apiUrl}/courses/${id}`);
    const { success, course } = response.data;
    return { error: !success, courses: course };
  }
);

export const addCourse = createAsyncThunk(
  'course/addCourse',
  async (values) => {
    const response = await axios.post(`${apiUrl}/courses/add`, values);
    const { success, course } = response.data;
    return { error: !success, courses: course };
  }
);

export const editCourse = createAsyncThunk(
  'course/editCourse',
  async (values) => {
    console.log(values);
    const response = await axios.put(`${apiUrl}/courses/${values._id}/edit`, values);
    const { success, course } = response.data;
    return { error: !success, courses: course };
  }
);

export const deleteCourse = createAsyncThunk(
  'course/deleteCourse',
  async (id) => {
    const response = await axios.delete(`${apiUrl}/courses/${id}/delete`);
    const { success } = response.data;
    return { error: !success };
  }
);

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
    },
    [deleteCourse.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteCourse.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    [deleteCourse.fulfilled]: (state, action) => {
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
export default reducer;
