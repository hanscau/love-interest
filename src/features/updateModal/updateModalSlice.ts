import { createSlice } from "@reduxjs/toolkit";

export const updateModalSlice = createSlice({
  name: "updateModal",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openUpdateModal: (state) => {
      state.isOpen = true;
    },
    closeUpdateModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openUpdateModal, closeUpdateModal } = updateModalSlice.actions;
export default updateModalSlice.reducer;
