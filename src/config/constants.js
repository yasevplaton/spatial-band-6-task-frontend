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
    label: "доля застроенной территории",
    help:
      "Отношение площади всех зданий к площади ячейки - чем меньше плотность, тем больше\n" +
      "вероятность возможности строительства нового здания.",
  },
  {
    fieldName2021: "transport",
    fieldName2025: "transport",
    label: "транспортная доступность",
    help:
      "Интегральный показатель, представленный в виде 100-бальной шкалы. Расчитывается на основе кол-ва остановок общественного транспорта и \n" +
      "близости станций метро в зоне 800 метров ячейки",
  },
  {
    fieldName2021: "potreb_2021",
    fieldName2025: "potreb_2025",
    label: "потребность населения в дополнительных местах",
    help: "Кол-во школьников в ячейке, нуждающихся в новой школе в радиусе 800 метров",
  },
  {
    fieldName2021: "new_school",
    fieldName2025: "new_school",
    label: "потенциал размещения новых объектов",
    help: "Кол-во нуждающихся в новых местах школьников в радиусе 800 метров от данной ячейки. Рассчитывается как суммарная потребность в дополнительных местах в радиусе 800 метров данной ячейки. Чем больше потенциал, тем больших масштабов строительство требуется для компенсации неудовлетворенного спроса",
  },
];

export const settingsHelp =
  "Найдите оптимальное место для размещения новой школы с помощью фильтров показателей";
