import { Switch } from "../../components/switch";
import { Slider } from "../../components/slider";
import { useDispatch, useSelector } from "react-redux";
import {
  get800mFlag,
  getMaxDensityValue,
  getMinOptimaValue,
  getMinTransportValue,
  getSelectedCategory,
  getYear,
} from "../../root-slice/root-selectors";
import { useGetGridStat } from "../../api/grid";
import { useCallback } from "react";
import {
  setMaxDensityValue,
  setMinOptimaValue,
  setMinTransportValue,
  setYear,
  toggle800m,
} from "../../root-slice/root-slice";
import { useDebouncedCallback } from "use-debounce";

export const Filters = () => {
  const flag800m = useSelector(get800mFlag);
  const year = useSelector(getYear);
  const minOptimaValue = useSelector(getMinOptimaValue);
  const maxDensityValue = useSelector(getMaxDensityValue);
  const minTransportValue = useSelector(getMinTransportValue);
  const selectedCategory = useSelector(getSelectedCategory);

  const dispatch = useDispatch();

  const { data: gridStat } = useGetGridStat(!!selectedCategory);

  const handleTimeSliderChange = useCallback(
    (value) => {
      dispatch(setYear(value));
    },
    [dispatch]
  );

  const handleOptimaSliderChange = useDebouncedCallback((value) => {
    dispatch(setMinOptimaValue(value));
  }, 300);

  const handleDensitySliderChange = useDebouncedCallback((value) => {
    dispatch(setMaxDensityValue(value));
  }, 300);

  const handleTransportSliderChange = useDebouncedCallback((value) => {
    dispatch(setMinTransportValue(value));
  }, 300);

  const change800mFlag = useCallback(() => {
    dispatch(toggle800m());
  }, [dispatch]);

  return (
    <div>
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
      <div>
        {gridStat && (
          <Slider
            title="Потенциал размещения объектов (мест)"
            min={gridStat.new_school[0]}
            max={gridStat.new_school[1]}
            startPoint={gridStat.new_school[1]}
            step={1}
            value={minOptimaValue}
            marks={{
              0: gridStat.new_school[0],
              [minOptimaValue]: minOptimaValue,
              [gridStat.new_school[1]]: gridStat.new_school[1],
            }}
            onChange={handleOptimaSliderChange}
          />
        )}
      </div>
      <div>
        {gridStat && (
          <Slider
            title="Плотность застройки (усл. ед.)"
            min={gridStat.share_buil[0]}
            max={gridStat.share_buil[1]}
            step={0.1}
            value={maxDensityValue}
            marks={{
              0: gridStat.share_buil[0],
              [maxDensityValue]: maxDensityValue,
              [gridStat.share_buil[1]]: gridStat.share_buil[1],
            }}
            onChange={handleDensitySliderChange}
          />
        )}
      </div>
      <div>
        {gridStat && (
          <Slider
            title="Транспортная доступность (усл. ед.)"
            min={gridStat.transport[0]}
            max={gridStat.transport[1]}
            step={1}
            value={minTransportValue}
            marks={{
              0: gridStat.transport[0],
              [minTransportValue]: minTransportValue,
              [gridStat.transport[1]]: gridStat.transport[1],
            }}
            onChange={handleTransportSliderChange}
          />
        )}
      </div>
      <div>
        <Slider
          title="Год отображения данных"
          min={2021}
          max={2025}
          step={null}
          value={year}
          marks={{ 2021: 2021, 2025: 2025 }}
          onChange={handleTimeSliderChange}
          trackStyle={{ background: "none" }}
        />
      </div>
    </div>
  );
};
