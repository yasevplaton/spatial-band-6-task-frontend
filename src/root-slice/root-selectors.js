import { createSelector } from "@reduxjs/toolkit";

const getRootState = (state) => state.root;

export const getSelectedCategory = createSelector(
  getRootState,
  (state) => state.selectedCategory
);

export const getYear = createSelector(getRootState, (state) => state.year);

export const getGridStyleField = createSelector(
  getRootState,
  getYear,
  (state, year) =>
    state.gridStyleField[year === 2025 ? "fieldName2025" : "fieldName2021"]
);

export const getVisible = (layerId) =>
  createSelector(getRootState, (state) => state.visible[layerId]);

export const get800mFlag = createSelector(
  getRootState,
  (state) => state.hide800mGrid
);

export const getMinOptimaValue = createSelector(
  getRootState,
  (state) => state.minOptimaValue
);

export const getMaxDensityValue = createSelector(
  getRootState,
  (state) => state.maxDensityValue
);

export const getMinTransportValue = createSelector(
  getRootState,
  (state) => state.minTransportValue
);

export const getShowModal = createSelector(
  getRootState,
  (state) => state.showModal
);
