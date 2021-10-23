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

export const hasGridStyleFieldTimestamp = createSelector(
  getRootState,
  (state) => {
    const { fieldName2021, fieldName2025 } = state.gridStyleField;
    return fieldName2021 !== fieldName2025;
  }
);

export const getVisible = (layerId) =>
  createSelector(getRootState, (state) => state.visible[layerId]);

export const get800mFlag = createSelector(
  getRootState,
  (state) => state.hide800mGrid
);
