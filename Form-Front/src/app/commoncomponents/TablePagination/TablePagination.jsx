import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  FormControl,
  Grid,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import classes from "./TablePagination.module.scss";

const TablePagination = ({
  pageCount,
  paginationSize,
  selectedPage,
  getPageSize,
  getPageCount,
  maxPage,
}) => {
  const [pagination] = useState([10, 25, 50, 100]);

  return (
    <Grid container className="!mt-2" spacing={2}>
      <Grid item xs={12} md={6} sm={6} className={`${classes.paginationLeft}`}>
        <Typography variant="caption" className={`${classes.gotoText} !mr-2`}>
          Rows Per Page
        </Typography>
        <FormControl size="small" className="!mr-2 bg-primary-Color6">
          <Select
            sx={{ "& .MuiSelect-select": { py: 0.75, px: 1.25 } }}
            onChange={(e) => getPageSize(e.target.value)}
            value={paginationSize}
          >
            {pagination.map((option, i) => (
              <MenuItem key={i} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="caption" className={`${classes.gotoText} !mr-2`}>
          Go To
        </Typography>

        <TextField
          value={selectedPage}
          onChange={(e) => getPageCount(parseInt(e.target.value, 10))}
          inputProps={{ min: 1, max: maxPage }}
          size="small"
          type="number"
          className="bg-primary-Color6"
          sx={{
            "& .MuiOutlinedInput-input": { py: 0.75, px: 1.25, width: 36 },
          }}
        />
      </Grid>

      <Grid item xs={12} md={6} sm={6} className={`${classes.paginationRight}`}>
        <Pagination
          onChange={(event, page) => getPageCount(page)}
          count={pageCount === 0 ? 1 : pageCount}
          page={selectedPage}
          variant="outlined"
          shape="rounded"
          showFirstButton
          showLastButton
          color="primary"
          className="pageStyle"
        />
      </Grid>
      </Grid>
  );
};

TablePagination.propTypes = {
  getPageCount: PropTypes.func.isRequired,
  getPageSize: PropTypes.func.isRequired,
  selectedPage: PropTypes.number,
  pageCount: PropTypes.number,
  paginationSize: PropTypes.number,
};

export default TablePagination;
