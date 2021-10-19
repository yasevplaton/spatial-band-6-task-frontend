import styles from "./sidebar.module.scss";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedCategory } from "../../root-slice/root-selectors";
import { setCategory } from "../../root-slice/root-slice";
import { GridStyleOptions } from "./grid-style-options";

export const Sidebar = () => {
  const selectedCategory = useSelector(getSelectedCategory);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setCategory(event.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        Выберите категорию социального назначения
      </div>
      <FormControl sx={{ m: 1, minWidth: 200, marginLeft: 0 }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Категория
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={selectedCategory}
          onChange={handleChange}
          label="Категория"
        >
          <MenuItem value="">
            <em>ОЧИСТИТЬ</em>
          </MenuItem>
          <MenuItem value="schools">Школы</MenuItem>
        </Select>
      </FormControl>
      <GridStyleOptions />
    </div>
  );
};
