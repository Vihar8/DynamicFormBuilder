import React from 'react'
import PropTypes from "prop-types";
import {
  Grid,
  Typography,
} from "@mui/material";
import classes from "./TablePagination.module.scss";

const TotalRecords = ({ totalRecords }) => {
  return (
    <div>
       <Grid item xs={12} className={classes.totalRecords}>
        <Typography variant="h6" className={classes.totalText}>
          Total Records: {totalRecords}
        </Typography>
      </Grid>
    </div>
  )
}
TotalRecords.propTypes = {
  totalRecords: PropTypes.number.isRequired,
};

export default TotalRecords
