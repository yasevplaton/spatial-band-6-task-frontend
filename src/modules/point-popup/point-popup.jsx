import React from "react";
import { Grid } from "@mui/material";
import styles from "./point-popup.module.scss";

export const PointPopup = ({ feature, config }) => {
  const { properties: props } = feature;

  return (
    <div className={styles.container}>
      {config.title && props[config.title] && (
        <div className={styles.title}>{props[config.title]}</div>
      )}
      {config.rows.map((row) => {
        if (props[row.fieldName] === "nan") {
          return null;
        }
        return (
          <Grid container spacing={1} key={row.fieldName}>
            <Grid item xs={6} className={styles.propName}>
              {row.label}
            </Grid>
            <Grid item xs={6}>
              {row.type === "link" ? (
                <a href={`https://${props[row.fieldName]}`}>
                  {props[row.fieldName]}
                </a>
              ) : (
                props[row.fieldName]
              )}
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};
