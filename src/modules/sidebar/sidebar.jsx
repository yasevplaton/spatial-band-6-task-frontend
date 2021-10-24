import styles from "./sidebar.module.scss";
import {
  Checkbox,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  get800mFlag,
  getSelectedCategory,
  getVisible,
  getYear,
  hasGridStyleFieldTimestamp,
} from "../../root-slice/root-selectors";
import {
  setCategory,
  setYear,
  toggle800m,
  toggleVisibility,
} from "../../root-slice/root-slice";
import { GridStyleOptions } from "./grid-style-options";
import { Slider } from "../../components/slider";
import { useCallback } from "react";
import { StyledFormControlLabel } from "../../components/form-controls";
import { Switch } from "../../components/switch";

export const Sidebar = () => {
  const selectedCategory = useSelector(getSelectedCategory);
  const hasTimestamp = useSelector(hasGridStyleFieldTimestamp);
  const schoolsVisible = useSelector(getVisible("schools"));
  const flag800m = useSelector(get800mFlag);
  const year = useSelector(getYear);
  const dispatch = useDispatch();

  const handleSelectChange = (event) => {
    dispatch(setCategory(event.target.value));
  };

  const handleTimeSliderChange = useCallback(
    (value) => {
      dispatch(setYear(value));
    },
    [dispatch]
  );

  const changeSchoolsVisibility = useCallback(() => {
    dispatch(toggleVisibility("schools"));
  }, [dispatch]);

  const change800mFlag = useCallback(() => {
    dispatch(toggle800m());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.label}>Выберите категорию объектов</div>
      <FormControl sx={{ m: 1, minWidth: 200, marginLeft: 0 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Категория
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selectedCategory}
          onChange={handleSelectChange}
          label="Категория"
        >
          <MenuItem value="">
            <em>ОЧИСТИТЬ</em>
          </MenuItem>
          <MenuItem value="schools">Школы</MenuItem>
        </Select>
      </FormControl>

      {selectedCategory && (
        <div>
          <StyledFormControlLabel
            control={
              <Checkbox
                checked={schoolsVisible}
                onChange={changeSchoolsVisibility}
              />
            }
            label="Существующие объекты"
          />
          <Divider style={{ paddingTop: "0.5rem" }} />
          <GridStyleOptions />
          <Divider style={{ paddingTop: "0.5rem" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "0.5rem",
            }}
          >
            <Switch checked={flag800m} onChange={change800mFlag} />
            <div style={{ fontSize: "12px" }}>
              Показать только участки за пределами 800 м от школы
            </div>
          </div>
          <div style={{ paddingTop: "2rem" }}>
            <Slider
              title="Год отображения данных"
              min={2021}
              max={2025}
              step={null}
              value={year}
              marks={{ 2021: 2021, 2025: 2025 }}
              onChange={handleTimeSliderChange}
              disabled={!hasTimestamp}
            />
          </div>
        </div>
      )}
    </div>
  );
};
