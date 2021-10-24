import styles from "./legend.module.scss";
import cn from "clsx";
import { useSelector } from "react-redux";
import {
  getGridStyleField,
  getSelectedCategory,
  getVisible,
} from "../../root-slice/root-selectors";
import { useGetGridColors } from "../../api/grid";

const gridLegendConfig = {
  live_humans_2021: {
    label: "Численность проживающего населения",
  },
  live_humans_2025: { label: "Численность проживающего населения" },
  work_humans: { label: "Численность работающего населения" },
  potreb_2021: {
    label: "Потребность населения в дополнительных местах",
  },
  potreb_2025: {
    label: "Потребность населения в дополнительных местах",
  },
  optima: { label: "Потенциал размещения новых объектов" },
};

export const Legend = () => {
  const curGridStyleField = useSelector(getGridStyleField);
  const schoolsVisible = useSelector(getVisible("schools"));
  const gridVisible = useSelector(getVisible("grid"));
  const category = useSelector(getSelectedCategory);
  const { data } = useGetGridColors(!!category);

  return (
    <div className={styles.root}>
      {schoolsVisible && (
        <div className={styles.legendBlockContainer}>
          <div className={styles.legendBlockTitle}>
            Нагрузка на существующие объекты
          </div>
          <div className={styles.colorRampContainer}>
            <div className={styles.colorRampContent}>
              <div className={styles.colorRampLabel}>низкая</div>
              <div
                className={styles.colorRamp}
                style={{
                  background: `linear-gradient(90deg, green, orange, red)`,
                }}
              />
              <div className={styles.colorRampLabel}>высокая</div>
            </div>
          </div>
        </div>
      )}

      {data && gridVisible && (
        <div className={styles.legendBlockContainer}>
          <div className={styles.legendBlockTitle}>
            {gridLegendConfig[curGridStyleField].label}
          </div>
          <div className={styles.colorRampContainer}>
            <div className={styles.colorRampContent}>
              <div className={styles.colorRampLabel}>min</div>
              <div className={cn(styles.colorRamp, styles.colorRampImage)}>
                <img
                  src={`data:image/png;base64,${data[curGridStyleField]}`}
                  alt=""
                  className={styles.img}
                />
              </div>
              <div className={styles.colorRampLabel}>max</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
