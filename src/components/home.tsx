import styles from "../styles/Home.module.css";
import Typography from "@mui/material/Typography";
import https from "https";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  registerables,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import LoadingSpin from "react-loading-spin";
import { ForkLeft } from "@mui/icons-material";

export default function Home() {
  const monthShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  function parseEmissionData(arr: Array<{ date: number; value: number }>) {
    let result: number[] = Array(12).fill(0);

    arr.forEach((item) => {
      let date = new Date(item.date * 1000);
      let month = date.getMonth();
      result[month] += item.value;
    });
    return result;
  }

  ChartJS.register(...registerables);

  const [totalEmissions, setTotalEmissions] = useState<number[]>([]);
  const [emissionIntensity, setEmissionIntensity] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    callAPI();
  }, []);

  const callAPI = async () => {
    try {
      setLoading(true);
      const agent = new https.Agent({
        rejectUnauthorized: false,
      });

      const res = await fetch("https://api-dev.emitwise.com/interview/data");

      if (!res.ok) {
        setErrorMessage(`Error! status: ${res.status}`);
        throw new Error(`Error! status: ${res.status}`);
      }

      const data = await res.json();
      setTotalEmissions(
        parseEmissionData(data["Total emissions"]).map((item) => item / 10)
      );
      setEmissionIntensity(parseEmissionData(data["Emission intensity"]));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const graphConfig = {
    labels: monthShort,
    datasets: [
      {
        type: "bar",
        label: "Total emissions (tCO2e)",
        title: "Total emissions (tCO2e)",
        yAxisID: "y1",
        stack: "stack 0",
        data: totalEmissions,
        backgroundColor: ["rgba(0, 211, 185, 1)"],
        borderColor: ["rgba(3, 133, 117, 1)"],
        borderWidth: 1,
        order: 2,
      },
      {
        type: "line",
        label: "Emissions Intensity (kgCO2e / m2)",
        title: "Emissions Intensity (kgCO2e / m2)",
        yAxisID: "y2",
        stack: "stack 0",
        data: emissionIntensity,
        backgroundColor: ["rgba(167, 97, 193, 1)"],
        borderColor: ["rgba(167, 97, 193, 1)"],
        borderWidth: 1,
        order: 1,
      },
    ],
  };

  return (
    <div className={styles.wrapper}>
      <Typography variant="h4" className={styles.title}>
        Antwerp plant
      </Typography>
      <Typography variant="h6" className={styles.subtitle}>
        The carbon emissions dashboard of our chemical plant in Antwerp contains
        information on the emissions of our facility, as well as the emissions
        of the facilities in the surrounding area. This information is essential
        in order to monitor and reduce our carbon footprint.
      </Typography>
      {loading && (
        <div className={styles.loading}>
          <li>
            <LoadingSpin primaryColor="#00D39" />
          </li>
        </div>
      )}
      {errorMessage !== "" && <p>{errorMessage}</p>}
      <div className={styles.graphWrapper}>
        <Chart
          data={graphConfig}
          width={500}
          height={500}
          options={{
            plugins: {
              legend: {
                title: {
                  text: "Emissions over time",
                  display: true,
                },
              },
            },
            maintainAspectRatio: false,
            scales: {
              y1: {
                title: {
                  display: true,
                  text: "Total emissions (tCO2e)",
                },
                type: "linear",
                position: "left",
                display: true,
                max: Math.round(
                  Math.max(...[...totalEmissions, ...emissionIntensity])
                ),
              },
              y2: {
                title: {
                  display: true,
                  text: "Emissions Intensity (kgCO2e / m2)",
                },
                type: "linear",
                position: "right",
                display: true,
                max: Math.round(
                  Math.max(...[...totalEmissions, ...emissionIntensity])
                ),
              },
            },
          }}
        />
      </div>
    </div>
  );
}
