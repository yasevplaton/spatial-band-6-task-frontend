import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./slider.module.scss";

export const SliderComponent = ({
  title,
  min,
  max,
  value,
  step,
  marks,
  onChange,
  trackStyle = {},
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <Slider
        min={min}
        max={max}
        defaultValue={value}
        step={step}
        marks={marks}
        onChange={onChange}
        startPoint={max}
        trackStyle={trackStyle}
      />
    </div>
  );
};
