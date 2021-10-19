import { createSelector } from "@reduxjs/toolkit";

const getRootState = (state) => state.root;

export const getSelectedCategory = createSelector(
  getRootState,
  (state) => state.selectedCategory
);

export const getGridStyleField = createSelector(
  getRootState,
  (state) => state.gridStyleField
);
