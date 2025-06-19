import React from "react";
import { Typography, Stack } from "@mui/material"; // Import Typography and Stack

const Loaders = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Stack alignItems="center" justifyContent="center" spacing={2}>
        {/* <img
          src="/assets/geda-bg.png" // Replace with your image path
          alt="Loading"
          className="animate-slow-spin w-20 h-20"
        /> */}
        <Typography 
          component="div" 
          style={{ 
            color: 'black', 
            textAlign: 'center', 
            fontSize: '16px', 
            fontWeight: '500', 
            marginTop: '10px',
            letterSpacing: '0.5px'
          }}
        >
          Please Wait...
        </Typography>
      </Stack>
      <style>{`
        @keyframes slow-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-slow-spin {
          animation: slow-spin 1.75s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loaders;
