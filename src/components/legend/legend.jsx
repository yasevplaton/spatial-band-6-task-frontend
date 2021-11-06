import styles from "./legend.module.scss";
import { useSelector } from "react-redux";
import { getGridStyleField, getVisible } from "../../root-slice/root-selectors";
import { gridColorMap } from "../../config/styles";
import { useGetGridStat } from "../../api/grid";
import { useGetSchoolLoadRange } from "../../api";

const gridLegendConfig = {
  live_humans_2021: {
    label: "Численность проживающего населения, чел",
  },
  live_humans_2025: { label: "Численность проживающего населения, чед" },
  work_humans: { label: "Численность работающего населения, чел" },
  potreb_2021: {
    label: "Потребность населения в дополнительных местах, мест",
  },
  potreb_2025: {
    label: "Потребность населения в дополнительных местах, мест",
  },
  new_school: { label: "Потенциал размещения новых объектов, мест" },
  share_buil: { label: "Доля застроенной территории" },
  transport: { label: "Транспортная доступность, усл. ед." },
};

export const Legend = () => {
  const curGridStyleField = useSelector(getGridStyleField);
  const schoolsVisible = useSelector(getVisible("schools"));
  const gridVisible = useSelector(getVisible("grid"));

  const { data: gridStat } = useGetGridStat();
  const { data: schoolLoadRange } = useGetSchoolLoadRange();

  return (
    <div className={styles.root}>
      {schoolsVisible && schoolLoadRange && (
        <div className={styles.legendBlockContainer}>
          <div className={styles.legendBlockTitle}>
            Нагрузка на существующие объекты, %
          </div>
          <div className={styles.colorRampContainer}>
            <div className={styles.colorRampContent}>
              <div
                className={styles.colorRamp}
                style={{
                  background: `linear-gradient(90deg, green, orange, red)`,
                }}
              />
              <div className={styles.colorRampLabelContainer}>
                <div className={styles.colorRampLabel}>до 100</div>
                <div className={styles.colorRampLabel}>
                  {schoolLoadRange[3]}
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.colorRampLabel}
            style={{ textAlign: "center", marginTop: "0.5rem" }}
          >
            Размер значка соответствует количеству учеников
          </div>
        </div>
      )}

      {gridVisible && gridStat && (
        <div className={styles.legendBlockContainer}>
          <div className={styles.legendBlockTitle}>
            {gridLegendConfig[curGridStyleField].label}
          </div>
          <div className={styles.colorRampContainer}>
            <div className={styles.colorRampContent}>
              <div
                className={styles.colorRamp}
                style={{
                  background: `linear-gradient(90deg, ${gridColorMap[curGridStyleField][0]}, ${gridColorMap[curGridStyleField][1]})`,
                }}
              />
              <div className={styles.colorRampLabelContainer}>
                <div className={styles.colorRampLabel}>
                  {gridStat[curGridStyleField][0]}
                </div>
                <div className={styles.colorRampLabel}>
                  {gridStat[curGridStyleField][1]}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
