import React from "react";
import { Grid } from "@mui/material";
import styles from "./popup.module.scss";

export const Popup = ({ feature, config }) => {
  const { properties: props } = feature;

  return (
    <div className={styles.container}>
      {config.title && props[config.title] && (
        <div className={styles.title}>{props[config.title]}</div>
      )}
      {config.rows.map((row, index) => {
        if (props[row.fieldName] === "nan") {
          return null;
        }
        return (
          <Grid
            container
            key={row.fieldName}
            className={styles.row}
            style={{ backgroundColor: index % 2 === 0 ? "white" : "#ecebeb" }}
          >
            <Grid item xs={6} className={styles.propName}>
              {row.label}
            </Grid>
            <Grid item xs={6} className={styles.propValueCol}>
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
