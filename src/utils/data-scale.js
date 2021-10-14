import { scaleLinear } from "d3-scale";

export const getDataRange = (values) => {
  return [Math.min(...values), Math.max(...values)];
};

export const getObjArrValues = (objArr, key) => {
  return objArr.map((obj) => obj[key]);
};

export const createScale = (dataRange, outputRange) => {
  return scaleLinear(dataRange, outputRange);
};
