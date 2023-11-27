import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedApplications: [],
};

const slice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    storeSelectedApplications(state, action) {
      state.selectedApplications = action.payload;
      return state;
    },
  },
});

export default slice;

export const { storeSelectedApplications } = slice.actions;

export const getSelectedApplications = (state) => {
  return state.navigation.selectedApplications;
};
