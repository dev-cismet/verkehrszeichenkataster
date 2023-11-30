import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedApplication: [],
};

const slice = createSlice({
  name: "application",
  initialState,
  reducers: {
    storeSelectedApplication(state, action) {
      state.selectedApplication = action.payload;
      return state;
    },
  },
});

export default slice;

export const { storeSelectedApplication } = slice.actions;

export const getSelectedApplication = (state) => {
  return state.application.selectedApplication;
};
