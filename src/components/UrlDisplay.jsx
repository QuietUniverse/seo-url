import { useSelector } from "react-redux";
import extractDomain from "extract-domain";
import styled from "@emotion/styled";

import { getDifferentRandomColors } from "../util/helper";
import styles from "./UrlDisplay.module.css";

function UrlDisplay() {
  const { URL } = useSelector((store) => store.ui);

  const domain = extractDomain(URL);
  const https = URL.split(domain);

  const [
    { color: randomColor1 },
    { color: randomColor2 },
    { color: randomColor3 },
  ] = getDifferentRandomColors(3);

  return (
    <div className={styles.layout}>
      <Link
        href={URL}
        target="_black"
        className={styles.url}
        color={randomColor1}
      >
        <LinkSVG height="100%" width="100%" color={randomColor2}>
          <use href="/sprite.svg#external-link" />
        </LinkSVG>

        <LinkSpan color={randomColor1}>{https[0]}</LinkSpan>
        <LinkSpan color={randomColor2}>{domain}</LinkSpan>
        <LinkSpan color={randomColor3}>{https[1]}</LinkSpan>
      </Link>
    </div>
  );
}

const Link = styled.a(({ color }) => ({
  transition: "all 0.3s ease-out",
  "&:visited > *, &:hover > *": { color: color, fill: color },
}));

const LinkSVG = styled.svg(({ color }) => ({
  fill: color,
  width: "1.5rem",
  height: "1.5rem",
  marginRight: "0.8rem",
  transition: "all 0.3s ease-out",
}));

const LinkSpan = styled.span(({ color }) => ({
  color: color,
  transition: "all 0.3s ease-out",
}));

export default UrlDisplay;
