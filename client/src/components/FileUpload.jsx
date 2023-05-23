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
          const response = await axios.post("", formData, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          });
          setDataSummary({ ...response.data });
          setIsUploading(false);
          setSelectedFile("");
          setIsUploadSuccess(true);
          setTitle("Data Upload Summary");
        } catch (error) {
          console.log(error);
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
        <h4 className={classes["dropzone-heading"]}>
          Drop files here or Click to upload
        </h4>
      </div>
    </div>
  );

  return (
    <div>
      <h4 className={classes.title}>{title}</h4>
      <Dropzone maxFiles={1} onDrop={handleFilesAccepted}>
        {({ getRootProps, getInputProps }) =>
          renderDropzoneContent(getRootProps, getInputProps)
        }
      </Dropzone>
      {isUploading && <LoadingSpinner />}
      {isUploadSuccess && (
        <DataSummary
          totalInsertedRecords={dataSummary.totalInsertedRecords}
          totalDuplicateDBRecords={dataSummary.totalDuplicateDBRecords}
        />
      )}
    </div>
  );
};

export default FileUploader;
