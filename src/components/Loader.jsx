import { useSelector } from "react-redux";

import { getRandomColor, hexToRGB } from "../util/helper";
import styles from "./Loader.module.css";

function Loader() {
  const { URL } = useSelector((store) => store.ui);

  return (
    <div className={styles.layout}>
      <div className={styles[`frame-width`]}>
        <iframe src={URL} className={styles.frame} scrolling="no" />
      </div>
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </div>
  );
}

function Square() {
  const { backgroundColor: bgColor, color } = getRandomColor();
  const { r, g, b } = hexToRGB(color);
  const vertical = Math.floor(Math.random() * 50) + 1;
  const horizontal = Math.floor(Math.random() * 50) + 1;

  const style =
    horizontal >= 15 && vertical >= 15
      ? {
          backgroundColor: bgColor,
          boxShadow: `0 0 1rem 0.5rem rgba(${r},${g},${b},0.5)`,
          top: `${vertical}%`,
          left: `${horizontal}%`,
        }
      : horizontal < 15 && vertical >= 15
      ? {
          backgroundColor: bgColor,
          boxShadow: `0 0 1rem 0.5rem rgba(${r},${g},${b},0.5)`,
          top: `${vertical}%`,
          right: `${horizontal}%`,
        }
      : horizontal < 15 && vertical >= 15
      ? {
          backgroundColor: bgColor,
          boxShadow: `0 0 1rem 0.5rem rgba(${r},${g},${b},0.5)`,
          bottom: `${vertical}%`,
          left: `${horizontal}%`,
        }
      : {
          backgroundColor: bgColor,
          boxShadow: `0 0 1rem 0.5rem rgba(${r},${g},${b},0.5)`,
          bottom: `${vertical}%`,
          right: `${horizontal}%`,
        };

  return <div className={styles.dot} style={style}></div>;
}

export default Loader;
