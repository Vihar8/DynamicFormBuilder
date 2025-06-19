import React, { createContext, useState, useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
    message: "",
    color: "default",
  });

  const showSnackbar = (message, color = "default") => {
    setSnackbar({
      open: true,
      vertical: "top",
      horizontal: "right",
      message,
      color,
    });

    // Automatically close the Snackbar after 10 seconds
    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }, 9000);
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const getSnackbarStyle = () => {
    switch (snackbar.color) {
      case "success":
        return { backgroundColor: "#4caf50" }; // Green for success
      case "error":
        return { backgroundColor: "#f44336" }; // Red for error
      default:
        return {};
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: snackbar.vertical,
          horizontal: snackbar.horizontal,
        }}
        open={snackbar.open}
        onClose={handleClose}
        key={snackbar.vertical + snackbar.horizontal}
      >
        <SnackbarContent
          style={getSnackbarStyle()}
          message={snackbar.message}
        />
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
