import styles from "./legend.module.scss";
import Grid from "@mui/material/Grid";

export const Legend = ({ data }) => {
  return (
    <div className={styles.root}>
      <div className={styles.pointsContainer}>
        <div className={styles.legendBlockTitle}>Коммерческая недвижимость</div>
        <Grid container direction="column">
          {/*{Object.keys(BUILDING_COLORS).map((type) => {*/}
          {/*  return (*/}
          {/*    <Grid item xs={12} container alignItems="baseline" key={type}>*/}
          {/*      <Grid item xs={1}>*/}
          {/*        <div*/}
          {/*          className={styles.pointCircle}*/}
          {/*          style={{ background: `${BUILDING_COLORS[type]}` }}*/}
          {/*        />*/}
          {/*      </Grid>*/}
          {/*      <Grid item xs={9} className={styles.pointDesc}>*/}
          {/*        {type}*/}
          {/*      </Grid>*/}
          {/*    </Grid>*/}
          {/*  );*/}
          {/*})}*/}
        </Grid>
      </div>
    </div>
  );
};
