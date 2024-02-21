import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signsLibMode: "none",
  signsLibIconClicked: null,
  editingDrawing: null,
};

const slice = createSlice({
  name: "signslib",
  initialState,
  reducers: {
    storeSignsLibMode(state, action) {
      state.signsLibMode = action.payload;
      return state;
    },
    storeSignsLibIconClicked(state, action) {
      state.signsLibIconClicked = action.payload;
      return state;
    },
    storeEditingDrawing(state, action) {
      state.editingDrawing = action.payload;
      return state;
    },
  },
});

export default slice;

export const {
  storeSignsLibMode,
  storeSignsLibIconClicked,
  storeEditingDrawing,
} = slice.actions;

export const getSignsLibMode = (state) => {
  return state.signslib.signsLibMode;
};
export const getSignsLibIconClicked = (state) => {
  return state.signslib.signsLibIconClicked;
};

export const getEditingDrawing = (state) => {
  return state.signslib.editingDrawing;
};
