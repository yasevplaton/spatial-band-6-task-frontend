import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: "",
  gridStyleField: {
    fieldName2021: "live_humans_2021",
    fieldName2025: "live_humans_2025",
  },
  visible: {
    schools: true,
    grid: true,
  },
  hide800mGrid: false,
  year: 2021,
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      const { payload } = action;

      state.selectedCategory = payload;
    },

    setGridStyleField: (state, action) => {
      const { payload } = action;

      state.gridStyleField = payload;
    },

    setYear: (state, action) => {
      const { payload } = action;

      state.year = payload;
    },

    toggleVisibility: (state, action) => {
      const { payload } = action;

      state.visible[payload] = !state.visible[payload];
    },

    toggle800m: (state) => {
      state.hide800mGrid = !state.hide800mGrid;
    },
  },
});

export const {
  setCategory,
  setGridStyleField,
  setYear,
  toggleVisibility,
  toggle800m,
} = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
