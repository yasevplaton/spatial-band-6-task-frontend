export const MAP_CENTER_DEFAULT = [55.733417, 37.618389];
export const MAP_ZOOM_DEFAULT = 15;
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
export const schoolLoadColorRange = ["green", "green", "orange", "red"];

export const gridStyleFields = [
  {
    fieldName2021: "live_humans_2021",
    fieldName2025: "live_humans_2025",
    label: "Численность проживающего населения",
  },
  {
    fieldName2021: "work_humans",
    fieldName2025: "work_humans",
    label: "Численность работающего населения",
  },
  {
    fieldName2021: "optima",
    fieldName2025: "optima",
    label: "Оптимальность размещения новых объектов",
  },
  {
    fieldName2021: "potreb_2021",
    fieldName2025: "potreb_2025",
    label: "Потребность населения в дополнительных местах",
  },
];
