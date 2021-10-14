import { getDataRange, getObjArrValues } from "../../utils";

export const getPupilsCountRange = (data) => {
  const values = getObjArrValues(data, "pupils_cnt");
  return getDataRange(values);
};

export const getShoolLoadRange = (data) => {
  const values = getObjArrValues(data, "nagruzka");
  return getDataRange(values);
};
