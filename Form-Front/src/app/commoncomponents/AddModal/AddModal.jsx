import React, { useState } from "react";
import { Modal, Fade, Box, Backdrop } from "@mui/material";
import classes from "./AddModal.module.scss";

const AddModal = ({ open, handleClose, children, classname }) => {
 
  return (
    <Modal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <Box className={`${classes.addModalBox} ${classname}`}>{children}</Box>
      </Fade>
    </Modal>
  );
};

export default AddModal;
