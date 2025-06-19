import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { CaretDownFilled } from "@ant-design/icons";

const DownloadMenu = ({
  downloadData,
  buttonProps,
  id,
  menuProps,
  downloadTitle,
  onClick,
  variant,
  color,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls={open ? id : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant={variant}
        color={color}
        size="small"
        className="!min-w-0 btnStyle"
        onClick={handleClick}
        {...buttonProps}
      >
        {downloadTitle && <span className="mr-2">{downloadTitle}</span>}
        <CaretDownFilled className="mr-0" />
      </Button>

      <Menu
        id={id}
        MenuListProps={{
          "aria-labelledby": id,
          ...menuProps,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "auto",
          },
        }}
      >
        {downloadData.map((data) => (
          <MenuItem
            key={data.id}
            onClick={onClick}
            className={`flex gap-2 !text-normaltext menuHover`}
          >
            {data.icons} {data.options}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DownloadMenu;
