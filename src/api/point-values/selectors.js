import { days } from "../../config/constants";

export const parseWeekData = (data) => {
  const weekData = data.days;
  return weekData.map((value, index) => {
    return {
      name: days[index],
      value,
    };
  });
};

export const parseDaysData = (data) => {
  const daysData = data.hours;
  return Object.keys(daysData).map((dayIndex) => {
    return daysData[dayIndex].map((value, hour) => {
      return {
        name: hour,
        value,
      };
    });
  });
};
