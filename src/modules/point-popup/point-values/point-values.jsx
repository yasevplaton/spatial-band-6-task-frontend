import React, { useState } from "react";
import styles from "./point-values.module.scss";
import { WeekChart } from "./week-chart";
import { StyledTabs as Tabs, TabPanel, StyledTab as Tab } from "components";
import { DaysChart } from "./days-chart";

const tabName = "all";

export const PointValues = ({ pointId }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, tabIndex) => {
    setSelectedTab(tabIndex);
  };

  return (
    <div className={styles.wrapper}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="point-values-tabs"
        centered
      >
        <Tab
          label="Сутки"
          id={`tab-${tabName}-0`}
          aria-controls={`tabpanel-${tabName}-0`}
        />
        <Tab
          label="Неделя"
          id={`tab-${tabName}-1`}
          aria-controls={`tabpanel-${tabName}-1`}
        />
      </Tabs>
      <TabPanel value={selectedTab} index={0} name={tabName}>
        <DaysChart pointId={pointId} />
      </TabPanel>
      <TabPanel value={selectedTab} index={1} name={tabName}>
        <WeekChart pointId={pointId} />
      </TabPanel>
    </div>
  );
};
