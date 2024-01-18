import { createSlice } from "@reduxjs/toolkit";

export const loginModalSlice = createSlice({
  name: "loginModal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = loginModalSlice.actions;
export default loginModalSlice.reducer;
