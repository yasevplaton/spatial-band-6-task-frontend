import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { getGridStyleField } from "../../root-slice/root-selectors";
import styles from "./sidebar.module.scss";
import { useCallback } from "react";
import { setGridStyleField } from "../../root-slice";

const StyledButton = styled(Button)(() => ({
  textTransform: "none",
  textAlign: "left",
  color: "black",
}));

const gridStyleFields = [
  {
    fieldName: "live_humans_2021",
    label: "Численность проживающего населения",
  },
  {
    fieldName: "work_humans",
    label: "Численность работающего населения",
  },
  {
    fieldName: "optima",
    label: "Оптимальность размещения новых объектов",
  },
  {
    fieldName: "potreb_2021",
    label: "Потребность населения в дополнительных местах",
  },
];

export const GridStyleOptions = () => {
  const curGridStyleField = useSelector(getGridStyleField);
  const dispatch = useDispatch();

  const toggleField = useCallback(
    (e) => {
      dispatch(setGridStyleField(e.target.name));
    },
    [dispatch]
  );

  return (
    <div>
      {gridStyleFields.map((item) => {
        const isActive = curGridStyleField === item.fieldName;
        return (
          <StyledButton
            variant="text"
            name={item.fieldName}
            className={isActive && styles.activeOption}
            onClick={toggleField}
            key={item.fieldName}
          >
            {item.label}
          </StyledButton>
        );
      })}
    </div>
  );
};
