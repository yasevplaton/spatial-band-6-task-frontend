export const MAP_CENTER_DEFAULT = [55.7558, 37.6173];
export const MAP_ZOOM_DEFAULT = 13;
export const MIN_ZOOM_DEFAULT = 10;
export const TILE_SERVER_URL =
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
export const TILE_SERVER_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const QUERY_KEYS = {
  SCHOOLS: "SCHOOLS",
};

export const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const schoolRadiusRange = [5, 5];

export const schoolLoadColors = {
  low: "green",
  middle: "orange",
  high: "red",
};
export const schoolLoadColorRange = [
  schoolLoadColors.low,
  schoolLoadColors.low,
  schoolLoadColors.middle,
  schoolLoadColors.high,
];

export const gridStyleFields = [
  {
    fieldName2021: "live_humans_2021",
    fieldName2025: "live_humans_2025",
    label: "численность проживающего населения",
  },
  {
    fieldName2021: "work_humans",
    fieldName2025: "work_humans",
    label: "численность работающего населения",
  },
  {
    fieldName2021: "share_buil",
    fieldName2025: "share_buil",
    label: "плотность застройки",
  },
  {
    fieldName2021: "transport",
    fieldName2025: "transport",
    label: "транспортная доступность",
  },
  {
    fieldName2021: "potreb_2021",
    fieldName2025: "potreb_2025",
    label: "потребность населения в дополнительных местах",
  },
  {
    fieldName2021: "new_school",
    fieldName2025: "new_school",
    label: "потенциал размещения новых объектов",
  },
];
