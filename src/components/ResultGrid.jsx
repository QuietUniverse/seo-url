import styled from "@emotion/styled";
import { getDifferentRandomColors } from "../util/helper";
import styles from "./ResultGrid.module.css";

function ResultGrid({ children }) {
  const [{ color: randomColor1 }, { color: randomColor2 }] =
    getDifferentRandomColors(2);

  return (
    <>
      <ul className={styles.grid}>{children}</ul>
      <footer className={styles.footer}>
        <p>
          {`Created with ❤️ by `}
          <CreditLink
            color={randomColor1}
            visitedColor={randomColor2}
            href="https://github.com/QuietUniverse?tab=repositories"
            className={styles.link}
          >
            QuietUniverse
          </CreditLink>
        </p>
      </footer>
    </>
  );
}

const CreditLink = styled.a(({ color, visitedColor }) => ({
  color: color,
  paddingBottom: "0.3rem",
  transition: "all 0.3s ease-out",
  "&:visited, &:hover": {
    color: visitedColor,
    boxShadow: `0 0.2rem 0 0 ${visitedColor}`,
  },
}));

export default ResultGrid;
