import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import User from "model/User";

interface UserState {
  user: User | null;
}

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
