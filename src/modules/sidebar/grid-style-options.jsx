import { Button, Checkbox, IconButton, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getGridStyleField,
  getVisible,
  getYear,
} from "../../root-slice/root-selectors";
import styles from "./sidebar.module.scss";
import { useCallback } from "react";
import { setGridStyleField } from "../../root-slice";
import { gridStyleFields } from "../../config/constants";
import { StyledFormControlLabel } from "../../components/form-controls";
import { toggleVisibility } from "../../root-slice/root-slice";
import HelpIcon from "@mui/icons-material/Help";

const StyledButton = styled(Button)(() => ({
  textTransform: "none",
  textAlign: "left",
  color: "black",
  fontSize: "13px",
}));

export const GridStyleOptions = () => {
  const curGridStyleField = useSelector(getGridStyleField);
  const gridVisible = useSelector(getVisible("grid"));
  const year = useSelector(getYear);
  const dispatch = useDispatch();

  const toggleField = useCallback(
    (e) => {
      const fieldInfo = gridStyleFields[+e.target.name];

      dispatch(
        setGridStyleField({
          fieldName2021: fieldInfo.fieldName2021,
          fieldName2025: fieldInfo.fieldName2025,
        })
      );
    },
    [dispatch]
  );

  const changeGridVisibility = useCallback(() => {
    dispatch(toggleVisibility("grid"));
  }, [dispatch]);

  return (
    <div>
      <StyledFormControlLabel
        control={
          <Checkbox checked={gridVisible} onChange={changeGridVisibility} />
        }
        label="Тепловая карта"
      />
      <div className={styles.fieldsList}>
        {gridStyleFields.map((item, index) => {
          const fieldName = year === 2025 ? "fieldName2025" : "fieldName2021";
          const isActive = curGridStyleField === item[fieldName];
          return (
            <div className={styles.itemContainer}>
              <StyledButton
                variant="text"
                name={index}
                className={isActive && styles.activeOption}
                onClick={toggleField}
                style={{
                  flexBasis: item.help ? "80%" : "100%",
                  justifyContent: "flex-start",
                }}
                key={index}
              >
                {item.label}
              </StyledButton>
              {item.help && (
                <div
                  style={{
                    flexBasis: "20%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Tooltip title={item.help} placement={"top"}>
                    <IconButton size={"small"}>
                      <HelpIcon
                        fontSize={"small"}
                        style={{ fill: "rgba(0, 0, 0, 0.1)" }}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
