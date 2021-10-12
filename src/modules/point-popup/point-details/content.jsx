import Grid from "@mui/material/Grid";
import styles from "./point-details.module.scss";
import React from "react";
import { imageUrlFieldName } from "../../../config/point-popup";

export const Content = ({ data, config }) => {
  return (
    <Grid container direction="column">
      <div className={styles.propList}>
        {config.map((prop) => {
          const value = data[prop.fieldName];
          return (
            <Grid
              item
              xs={12}
              container
              key={prop.fieldName}
              direction="column"
              sx={{
                marginBottom: "0.5rem",
              }}
            >
              <Grid item className={styles.propTitle}>
                {prop.alias}
              </Grid>
              <Grid item>{value}</Grid>
            </Grid>
          );
        })}
      </div>
      <div className={styles.imgContainer}>
        <img src={data[imageUrlFieldName]} alt="" className={styles.img} />
      </div>
    </Grid>
  );
};
