import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import classes from "./FileUpload.module.scss";

const FileUpload = ({
  onFileSelect,
  fileId,
  fileNotes,
  buttonLabel = "Upload",
  acceptedFileTypes = "image/*",
  defaultFileUploaded = false,
  disabled = false
}) => {
//   const [fileUploaded, setFileUploaded] = useState(false);

  // Set `fileUploaded` to true on initial render if `defaultFileUploaded` is true
//   useEffect(() => {
//     if (defaultFileUploaded) {
//       setFileUploaded(true);
//     }
//   }, [defaultFileUploaded]);

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
    //   setFileUploaded(true);
      if (onFileSelect) {
        onFileSelect(e.target.files[0]); // Pass selected file back to the parent component
      }
    }
  };

  return (
    <>
      <div className={`${classes.fileUploadBox}`}>
        <input
          accept={acceptedFileTypes}
          className="hidden"
          id={fileId}
          type="file"
          onChange={handleFileUpload}
          disabled={disabled}
        />
        <label htmlFor={fileId} className={`${classes.lableUpload}`}>
          <Button
            component="span"
            className="!pr-0 !pl-0 xl:!pl-1"
            startIcon={
              <img
                src="/assets/icons/uploadIcon.svg"
                alt="checked"
                className={`${classes.uploadIcon}`}
              />
            }
          >
            <p className={`${classes.btnLabel}`}>{buttonLabel}</p>
          </Button>
        </label>
        {defaultFileUploaded && <img src="/assets/check_icon.svg" alt="checked" className={`${classes.uploadIcon}`} />}
      </div>
      {fileNotes && <p className={`${classes.fileNotes}`}>{fileNotes}</p>}
    </>
  );
};

export default FileUpload;
