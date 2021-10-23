import { Button, Checkbox } from "@mui/material";
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

const StyledButton = styled(Button)(() => ({
  textTransform: "none",
  textAlign: "left",
  color: "black",
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
      {gridStyleFields.map((item, index) => {
        const fieldName = year === 2025 ? "fieldName2025" : "fieldName2021";
        const isActive = curGridStyleField === item[fieldName];
        return (
          <StyledButton
            variant="text"
            name={index}
            className={isActive && styles.activeOption}
            onClick={toggleField}
            key={index}
          >
            {item.label}
          </StyledButton>
        );
      })}
    </div>
  );
};
