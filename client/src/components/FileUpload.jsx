import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import uploadIcon from "../assets/images/upload.png";
import classes from "./FileUpload.module.css";
import DataSummary from "./DataSummary";
import LoadingSpinner from "./UI/LoadingSpinner";

const FileUploader = () => {
  const [title, setTitle] = useState("Upload your File (CSV)");
  const [selectedFile, setSelectedFile] = useState("");
  const [dataSummary, setDataSummary] = useState({
    totalInsertedRecords: 0,
    totalDuplicateCSVRecords: 0,
    totalDuplicateDBRecords: 0,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadSuccess, setIsUploadSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleFilesAccepted = (files) => {
    setSelectedFile(files);
  };

  useEffect(() => {
    const handleFileUpload = async () => {
      if (selectedFile) {
        setIsUploading(true);
        setTitle("Uploading...");
        const formData = new FormData();
        formData.append("file", selectedFile[0]);

        try {
          const response = await axios.post(
            "http://localhost:8000/api/upload-data",
            formData,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            }
          );
          setDataSummary({ ...response.data });
          setIsUploading(false);
          setSelectedFile("");
          setIsUploadSuccess(true);
          setTitle("Data Upload Summary");
        } catch (error) {
          console.log(error);
          setIsError(true);
          setSelectedFile("");
          setIsUploading(false);
          setTitle("Only CSV files are allowed");
        }
      }
    };

    handleFileUpload();
  }, [selectedFile]);

  const renderDropzoneContent = (getRootProps, getInputProps) => (
    <div className={classes["dropzone-container"]}>
      <div className={classes["dropzone-box"]} {...getRootProps()}>
        <input name="image" {...getInputProps()} />
        <div className={classes["dropzone-icon"]}>
          <img
            className={classes["dropzone-icon-image"]}
            src={uploadIcon}
            alt="upload csv"
          />
        </div>
        <h4 className={classes["dropzone-heading"]}>Drop your files here</h4>
      </div>
    </div>
  );

  const uploadHandler = () => {
    setIsUploadSuccess(false);
    setIsUploading(false);
    setIsError(false);
    setTitle("Upload your File (CSV)");
  };

  return (
    <div className={classes.card}>
      <h4 className={classes.title}>{title}</h4>
      {!isUploadSuccess && !isUploading && !isError && (
        <Dropzone maxFiles={1} onDrop={handleFilesAccepted}>
          {({ getRootProps, getInputProps }) =>
            renderDropzoneContent(getRootProps, getInputProps)
          }
        </Dropzone>
      )}
      {isError && !isUploading && !isUploadSuccess && (
        <div className={classes.error}>An error occurred !</div>
      )}
      {isUploading && <LoadingSpinner />}
      {isUploadSuccess && (
        <DataSummary
          totalInsertedRecords={dataSummary.totalInsertedRecords}
          totalDuplicateDBRecords={dataSummary.totalDuplicateDBRecords}
        />
      )}
      {isError || isUploading || isUploadSuccess ? (
        <button className={classes.uploadButton} onClick={uploadHandler}>{isUploading ? 'Cancel Uploading' : `Upload again`}</button>
      ) : null}
    </div>
  );
};

export default FileUploader;
