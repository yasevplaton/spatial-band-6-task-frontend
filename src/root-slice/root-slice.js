import { createSlice } from "@reduxjs/toolkit";

// live_humans_2021
// live_humans_2025
// optima
// potreb_2021
// potreb_2025
// work_humans

const initialState = {
  selectedCategory: "",
  gridStyleField: "live_humans_2021",
  schoolsVisible: true,
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
  },
});

export const { setCategory, setGridStyleField } = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
