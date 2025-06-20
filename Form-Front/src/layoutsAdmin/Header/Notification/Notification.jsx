import { BellOutlined } from "@ant-design/icons";
import { Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Notification.module.scss";

const Notification = () => {
  const [openNotify, setopenNotify] = useState(null);
  const openNotifyMenu = Boolean(openNotify);
  const handleNotifyClick = (event) => {
    setopenNotify(event.currentTarget);
  };

  const handleNotifyClose = () => {
    setopenNotify(null);
  };

  const notifyMenu = [
    {
      to: "/",
      date: "28/06/2024",
      title: "Approval Request",
      text: "Approval requested by bhumika patel for Costing No#: CST/24-25/451.",
    },
    {
      to: "/",
      date: "25/06/2024",
      title: "Task Started",
      text: "Task 'Completion-Partially Dispatched' assigned to aniket roy is Started. Project No# : PRJ/24-25/543",
    },
    {
      to: "/",
      date: "25/06/2024",
      title: "Task Assigned",
      text: "Task 'Task' Completion-Partially Dispatched' assigned by bhumika patel to aniket roy.Project No# : PRJ/24-25/543",
    },
    {
      to: "/",
      date: "25/06/2024",
      title: "Payment Received",
      text: "Invoice No# : INV/24-25/360. Amount : ₹1,180.00 Due Amount : ₹0.00",
    },
  ];

  return (
    <>
      <Tooltip title="Notification" arrow>
        <div
          className="cursor-pointer relative"
          onClick={handleNotifyClick}
          aria-controls={openNotifyMenu ? "notify-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openNotifyMenu ? "true" : undefined}
        >
          <BellOutlined className="text-gray-500" />
          <span className={`${classes.notifyCount}`}>3</span>
        </div>
      </Tooltip>

      <Menu
        anchorEl={openNotify}
        id="notify-menu"
        open={openNotifyMenu}
        onClick={handleNotifyClose}
        onClose={handleNotifyClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: "330px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiMenu-list": {
              paddingBottom: "0px",
            },
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 6,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className={`${classes.notifyBody}`}>
          {notifyMenu.map((item, index) => (
            <MenuItem key={index} className="!p-0 menuHover">
              <Link to={item.to} className={`${classes.notifyMenuLink}`}>
                <div className={`${classes.notifyHeader}`}>
                  <span className={`${classes.notifyTitle}`}>{item.title}</span>
                  <span className={`${classes.notifyDate}`}>{item.date}</span>
                </div>
                <span className={`${classes.notifyName}`}>{item.text}</span>
              </Link>
            </MenuItem>
          ))}
        </div>
        <MenuItem className="!p-0">
          <Link to="/" className={`${classes.notifyMenuLink} justify-center`}>
            <span className={`${classes.notifyName} !text-primary-Color1`}>
              VIEW ALL
            </span>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Notification;
