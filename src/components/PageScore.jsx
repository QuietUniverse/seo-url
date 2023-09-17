import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";

import styles from "./PageScore.module.css";
import { pastelColors } from "../util/helper";

ChartJS.register(ArcElement, Tooltip, Legend);

const windowWidth = window.innerWidth;

const options =
  windowWidth <= 700
    ? {
        plugins: {
          legend: {
            display: false,
          },
        },
        cutout: 30,
      }
    : {
        plugins: {
          legend: {
            display: false,
          },
        },
      };

export function PageScore() {
  const { pageScore } = useSelector((store) => store.ui);

  const color =
    pageScore >= 95
      ? pastelColors[6]
      : pageScore >= 90
      ? pastelColors[2]
      : pageScore >= 85
      ? pastelColors[3]
      : pastelColors[5];

  const data = {
    labels: ["Rank Lowered By", "Rank Score"],
    datasets: [
      {
        data: [100 - pageScore, pageScore],
        backgroundColor: [color.backgroundColor, color.color],
      },
    ],
  };

  return (
    <div
      className={styles.layout}
      style={{
        height: windowWidth <= 700 ? "15vh" : "30vh",
        width: "auto",
        marginTop: "1.5rem",
      }}
    >
      <Doughnut height="100%" width="auto" data={data} options={options} />
      <p className={styles.score}>{pageScore}</p>
    </div>
  );
}

export default PageScore;
