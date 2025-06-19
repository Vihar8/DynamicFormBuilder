import { Box, Drawer } from '@mui/material'
import React from 'react'

const Drawers = ({ anchor = "right", open, onClose, children }) => {
  return (
    <React.Fragment>
        <Drawer anchor={anchor} open={open} onClose={onClose}>
        <Box sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 380, p: 2 }}>
            {children}
        </Box>
        </Drawer>
    </React.Fragment>
  )
}

export default Drawers
