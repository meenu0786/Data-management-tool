import React from "react";
import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.container}>
      <div className={classes.spinner}></div>
      <p className={classes.text}>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
