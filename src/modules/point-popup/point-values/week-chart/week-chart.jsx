import React from "react";
import styles from "./week-chart.module.scss";
import { Chart } from "components/chart";
import { useGetWeekData } from "api";
import { withLoading } from "modules/withLoading";

const AsyncChart = withLoading(Chart);

export const WeekChart = ({ pointId }) => {
  const { data, status } = useGetWeekData(pointId);
  return (
    <div className={styles.wrapper}>
      <AsyncChart data={data} status={status} XLabel="Дни" />
    </div>
  );
};
