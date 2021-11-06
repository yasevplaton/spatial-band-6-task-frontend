import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: "schools",
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
  minOptimaValue: 0,
  maxDensityValue: 1,
  minTransportValue: 0,
  showModal: true,
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

    setMinOptimaValue: (state, action) => {
      const { payload } = action;

      state.minOptimaValue = payload;
    },

    setMaxDensityValue: (state, action) => {
      const { payload } = action;

      state.maxDensityValue = payload;
    },

    setMinTransportValue: (state, action) => {
      const { payload } = action;

      state.minTransportValue = payload;
    },

    setShowModal: (state, action) => {
      const { payload } = action;

      state.showModal = payload;
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
  setMinOptimaValue,
  setMaxDensityValue,
  setMinTransportValue,
  setShowModal,
} = rootSlice.actions;

export const rootReducer = rootSlice.reducer;
