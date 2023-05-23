import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import uploadIcon from "../assets/images/upload.png";
import classes from "./FileUpload.module.css";

const FileUploader = () => {
  const [title, setTitle] = useState("Upload your File (CSV)");
  const [selectedFile, setSelectedFile] = useState("");

  const handleFilesAccepted = (files) => {
    setSelectedFile(files);
  };

  useEffect(() => {
    const handleFileUpload = async () => {
      if (selectedFile) {
        setTitle("Uploading...");
        const formData = new FormData();
        formData.append("file", selectedFile[0]);

        try {
          const response = await axios.post("", formData, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          });

          setSelectedFile("");
          setTitle("Data Upload Summary");
        } catch (error) {
          console.log(error);
          setSelectedFile("");
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
          Drop files here or Click
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
    </div>
  );
};

export default FileUploader;
