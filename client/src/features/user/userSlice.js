import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

const initialState = {
  users: [],
  user: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Multiple Users
export const getUsers = createAsyncThunk(
  "users/getUser",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access;
      return await userService.getUsers(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single User
export const getUser = createAsyncThunk(
  'users/get',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      return await userService.getUser(userId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    reset: () => initialState,
    resetVariables: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset, resetVariables } = userSlice.actions;
export default userSlice.reducer;