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
  getSelectedCategory,
  getVisible,
} from "../../root-slice/root-selectors";
import { setCategory, toggleVisibility } from "../../root-slice/root-slice";
import { GridStyleOptions } from "./grid-style-options";
import { useCallback, useState } from "react";
import { StyledFormControlLabel } from "../../components/form-controls";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../../components/accordion";
import { Filters } from "../filters";

export const Sidebar = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);

  const toggleFiltersVisible = useCallback(() => {
    setFiltersVisible(!filtersVisible);
  }, [filtersVisible]);

  const selectedCategory = useSelector(getSelectedCategory);
  const schoolsVisible = useSelector(getVisible("schools"));
  const dispatch = useDispatch();

  const changeSchoolsVisibility = useCallback(() => {
    dispatch(toggleVisibility("schools"));
  }, [dispatch]);
  const handleSelectChange = (event) => {
    dispatch(setCategory(event.target.value));
  };

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
          <Accordion expanded={filtersVisible} onChange={toggleFiltersVisible}>
            <AccordionSummary
              aria-controls="filters-content"
              id="filters-header"
            >
              Настройки
            </AccordionSummary>
            <AccordionDetails>
              <Filters />
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </div>
  );
};
