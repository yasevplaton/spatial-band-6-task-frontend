import React from "react";
import styles from "./point-details.module.scss";
import { useGetPointDetails } from "api";
import { withLoading } from "../../withLoading";
import { Content } from "./content";

const AsyncContent = withLoading(Content);

export const PointDetails = ({ pointId, config }) => {
  const { data, status } = useGetPointDetails(pointId);
  return (
    <div className={styles.root}>
      <AsyncContent data={data} status={status} config={config} />
    </div>
  );
};
