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
    updateName(state, action) {
      const { index, updatedName } = action.payload;
      const updatedTimeline = [...state.timeline];

      updatedTimeline[index] = {
        ...updatedTimeline[index],
        values: {
          ...updatedTimeline[index].values,
          name: updatedName,
        },
      };

      return { ...state, timeline: updatedTimeline };
    },
    deleteTimelineObject(state, action) {
      const index = action.payload;
      const updatedTimeline = [...state.timeline];

      updatedTimeline.splice(index, 1);

      return {
        ...state,
        timeline: updatedTimeline,
      };
    },
  },
});

export default slice;

export const {
  storeSelectedApplication,
  storeTimeline,
  updateName,
  deleteTimelineObject,
} = slice.actions;

export const getSelectedApplication = (state) => {
  return state.application.selectedApplication;
};

export const getTimeline = (state) => {
  return state.application.timeline;
};
