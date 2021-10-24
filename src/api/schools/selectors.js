import {
  getObjArrValues,
  getRadiusRange,
  getSchoolLoadRange as getLoadRange,
} from "../../utils";

export const getPupilsCountRange = (data) => {
  const schoolsProps = data.features.map((f) => f.properties);
  const values = getObjArrValues(schoolsProps, "pupils_cnt");
  return getRadiusRange(values);
};

export const getShoolLoadRange = (data, propName) => {
  const schoolsProps = data.features.map((f) => f.properties);
  const values = getObjArrValues(schoolsProps, propName);
  return getLoadRange(values);
};
