import React from "react";
import Chart from "react-apexcharts";
import classes from "./DataSummary.module.css";

const DataSummary = (props) => {
  const { totalInsertedRecords, totalDuplicateDBRecords } = props;

  const colors = ["#4197BD", "#d78989"]; // Custom color for each segment

  const [chartOptions, setChartOptions] = React.useState({
    series: [totalInsertedRecords, totalDuplicateDBRecords],
    options: {
      chart: {
        type: "donut",
      },
      colors: colors,
      labels: ["Inserted Records", "Duplicate Records"],
    },
  });
  

  return (
    <>
      <div className={classes.gridContainer}>
        <div className={classes.totalRecords}>
          Total Records Inserted: {totalInsertedRecords}
        </div>
        <div className={classes.totalRecords}>
          Total Duplicate Records: {totalDuplicateDBRecords}
        </div>
        <div className={classes.chart}>
          <Chart
            options={chartOptions.options}
            series={chartOptions.series}
            labels={chartOptions.labels}
            type="donut"
            width="400"
          />
        </div>
      </div>
    </>
  );
};

export default DataSummary;
