import { getDifferentRandomColors } from "../util/helper";

function Title() {
  const [
    { color: randomColor1 },
    { color: randomColor2 },
    { color: randomColor3 },
  ] = getDifferentRandomColors(3);

  return (
    <h1>
      <span style={{ color: randomColor1 }}>Data</span>
      <span style={{ color: randomColor2 }}>For</span>
      <span style={{ color: randomColor3 }}>Seo</span> On-Page API Sandbox
      Widget
    </h1>
  );
}

export default Title;
