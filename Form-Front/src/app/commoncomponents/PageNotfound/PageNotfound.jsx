import React from 'react'
import { Link } from 'react-router-dom'
import classes from "./PageNotfound.module.scss";
import { Button } from '@mui/material';

const PageNotfound = () => {
  return (
    <div className={`${classes.wrapper}`}>
      <div className={`${classes.div}`}>
        {/* Image */}
        <img 
          src="/assets/sumantyres.png" 
          alt="404 illustration" 
          className={`${classes.img}`}
        />
        
        {/* Error Message */}
        <h1 className={`${classes.h1}`}>Page Not Found</h1>
        <p className={`${classes.para}`}>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/">
        <Button 
        variant="contained"
        color="success" 
        size="small" 
        className="buttonStyle" 
        type="submit">
            Back To Home
          </Button>
          </Link>
      </div>
    </div>
  )
}

export default PageNotfound
