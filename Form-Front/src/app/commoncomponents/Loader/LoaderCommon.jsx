import React from "react";
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { CircularProgress, Stack, Typography } from '@mui/material';

// loader style
const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  height: 'calc(100vh - 0px)',
  background:"rgb(38 38 38 / 5%)",
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  '& > * + *': {
    marginTop: theme.spacing(2)
  }
}));

// ==============================|| Loader ||============================== //

const LoaderCommon = () => (
  // <LoaderWrapper>
  //   {/*<LinearProgress color="primary" />*/}
	// <Stack style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
	// 	<CircularProgress color="primary"/>
	// 	<Typography component='div' style={{ color: 'black', textAlign: 'center' }}>
  //           Please Wait...
  //       </Typography>
	// </Stack>
  // </LoaderWrapper>
  <LoaderWrapper>
    {/*<LinearProgress color="primary" />*/}
    <Stack
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress style={{color: "green"}} />
      <Typography component="div" style={{ color: "black", marginTop: 10 }}>
        {" "}
        Please Wait...{" "}
      </Typography>
    </Stack>
  </LoaderWrapper>
);

export default LoaderCommon;
