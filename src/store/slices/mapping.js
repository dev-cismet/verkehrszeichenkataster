import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leafletElement: undefined,
  bbPoly: undefined,
};

const slice = createSlice({
  name: "mapping",
  initialState,
  reducers: {
    setLeafletElement(state, action) {
      state.leafletElement = action.payload;
      return state;
    },
    setBBPoly(state, action) {
      state.bbPoly = action.payload;
      return state;
    },
  },
});

export default slice;

export const { setLeafletElement, setBBPoly } = slice.actions;

export const getLeafletElement = (state) => {
  return state.mapping.leafletElement;
};

export const getBBPoly = (state) => {
  return state.mapping.bbPoly;
};
