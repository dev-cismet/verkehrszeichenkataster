import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allApplications: [],
  selectedApplications: [],
  currentApplication: {},
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
    storeAllApplications(state, action) {
      state.allApplications = action.payload;
      return state;
    },
    storeSelectedApplications(state, action) {
      state.selectedApplications = action.payload;
      return state;
    },
    storeCurrentApplication(state, action) {
      state.currentApplication = action.payload;
      return state;
    },
    storeTimeline(state, action) {
      const { id, timeline } = action.payload;
      const updatedApplications = state.allApplications.map((item) => {
        if (item.id.toString() === id) {
          return {
            ...item,
            timeline: timeline,
          };
        }
        return item;
      });

      const updatedSelectedApplications = state.selectedApplications.map(
        (item) => {
          if (item.id.toString() === id) {
            return {
              ...item,
              timeline: timeline,
            };
          }
          return item;
        }
      );

      return {
        ...state,
        allApplications: updatedApplications,
        selectedApplications: updatedSelectedApplications,
      };
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
  storeAllApplications,
  storeSelectedApplications,
  storeCurrentApplication,
  storeSelectedRowKeys,
  storeTimeline,
  updateName,
  deleteTimelineObject,
} = slice.actions;

export const getAllApplications = (state) => {
  return state.application.allApplications;
};

export const getSelectedApplications = (state) => {
  return state.application.selectedApplications;
};

export const getCurrentApplication = (state) => {
  return state.application.currentApplication;
};

export const getTimeline = (state) => {
  return state.application.timeline;
};
