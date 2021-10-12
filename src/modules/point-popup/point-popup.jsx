import React from "react";
import { PointDetails } from "./point-details";
import { PointValues } from "./point-values";
import styles from "./point-popup.module.scss";
import { pointDetailsConfig } from "config/point-popup";

export const PointPopup = ({ feature }) => {
  const { point_id: pointId } = feature;
  return (
    <div className={styles.wrapper}>
      <PointDetails pointId={pointId} config={pointDetailsConfig} />
      <PointValues pointId={pointId} />
    </div>
  );
};
