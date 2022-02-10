import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from 'app/constants';
import axios from 'axios';
import setAuthToken from 'utils/setAuthToken';

const initialState = {
  authLoading: false,
  message: '',
  isAuthenticated: false,
  user: null,
  error: false
};


export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiUrl}/auth`);
      const { success, user } = response.data;
      if (success) {
        return { isAuthenticated: true, user };
      } else {
        return { isAuthenticated: false, user: null };
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      return initialState;
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (user) => {
    const response = await axios.post(`${apiUrl}/auth/login`, user);
    const { message, success, accessToken } = response.data;
    if (success) {
      localStorage.setItem(
        LOCAL_STORAGE_TOKEN_NAME,
        response.data.accessToken
      );
    }
    return { message, error: !success, accessToken };
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (user) => {
    const response = await axios.post(`${apiUrl}/auth/register`, user);
    const { message, success, accessToken } = response.data;
    if (success) {
      localStorage.setItem(
        LOCAL_STORAGE_TOKEN_NAME,
        response.data.accessToken
      );
    }
    return { message, error: !success, accessToken };
  }
);

const auth = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      state = initialState;
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.authLoading = true;
    },
    [login.rejected]: (state, action) => {
      state.authLoading = false;
    },
    [login.fulfilled]: (state, action) => {
      const newState = {
        ...state,
        ...action.payload,
        authLoading: false
      };
      return newState;
    },
    [register.pending]: (state) => {
      state.authLoading = true;
    },
    [register.rejected]: (state, action) => {
      state.authLoading = false;
    },
    [register.fulfilled]: (state, action) => {
      const newState = {
        ...state,
        ...action.payload,
        authLoading: false
      };
      return newState;
    },
    [loadUser.pending]: (state) => {
      state.authLoading = true;
    },
    [loadUser.rejected]: (state, action) => {
      state.authLoading = false;
    },
    [loadUser.fulfilled]: (state, action) => {
      const newState = {
        ...state,
        ...action.payload,
        authLoading: false
      };
      return newState;
    }
  }
});

const { reducer, actions } = auth;
export const { logout } = actions;
export default reducer;
