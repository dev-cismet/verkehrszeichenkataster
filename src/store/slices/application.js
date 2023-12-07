import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedApplication: [],
  timeline: [
    {
      type: "antrag",
      values: {
        ort: "Barmen",
        name: "Antrag",
      },
    },
  ],
};

const slice = createSlice({
  name: "application",
  initialState,
  reducers: {
    storeSelectedApplication(state, action) {
      state.selectedApplication = action.payload;
      return state;
    },
    storeTimeline(state, action) {
      state.timeline = action.payload;
      return state;
    },
  },
});

export default slice;

export const { storeSelectedApplication, storeTimeline } = slice.actions;

export const getSelectedApplication = (state) => {
  return state.application.selectedApplication;
};

export const getTimeline = (state) => {
  return state.application.timeline;
};
