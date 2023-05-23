import React from "react";
import classes from "./DataSummary.module.css";

const DataSummary = (props) => {
  const { totalInsertedRecords, totalDuplicateDBRecords} = props;
  return (
    <>
      <div className={classes.gridContainer}>
        <div className={classes.totalRecords}>
          Total Records Inserted: {totalInsertedRecords}
        </div>
        <div className={classes.totalRecords}>
          Total Duplicate Records: {totalDuplicateDBRecords}
        </div>
      </div>
    </>
  );
};

export default DataSummary;
