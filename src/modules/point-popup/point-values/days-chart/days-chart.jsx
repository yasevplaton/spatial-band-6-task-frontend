import React, { useState } from "react";
import styles from "./days-chart.module.scss";
import { StyledTabs as Tabs, TabPanel, StyledTab as Tab } from "components";
import { Chart } from "components/chart";
import { days } from "config/constants";
import { useGetDaysData } from "api";
import { withLoading } from "modules/withLoading";

const AsyncChart = withLoading(Chart);

const tabName = "days";

export const DaysChart = ({ pointId }) => {
  const { data, status } = useGetDaysData(pointId);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  const handleChange = (event, dayIndex) => {
    setSelectedDayIndex(dayIndex);
  };

  return (
    <div>
      <Tabs
        value={selectedDayIndex}
        onChange={handleChange}
        aria-label="days-stats"
        centered
      >
        {days.map((label, index) => {
          return (
            <Tab
              label={label}
              id={`tab-${tabName}-${index}`}
              aria-controls={`tabpanel-${tabName}-${index}`}
              className={styles.tab}
              key={`tab-${tabName}-${index}`}
            />
          );
        })}
      </Tabs>
      {days.map((label, index) => {
        return (
          <TabPanel
            value={selectedDayIndex}
            index={index}
            name={tabName}
            key={`tabpanel-${tabName}-${index}`}
          >
            <div className={styles.chartWrapper}>
              <AsyncChart
                data={data && data[index]}
                status={status}
                XLabel="Часы"
              />
            </div>
          </TabPanel>
        );
      })}
    </div>
  );
};
