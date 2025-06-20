import { DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import React, { useState } from "react";
import classes from "../Header.module.scss";
import { Link } from "react-router-dom";
import defaultUser from "/assets/defaultUser.png";

const AccountDetail = () => {
  const [openProfile, setopenProfile] = useState(null);
  const open = Boolean(openProfile);
  const handleProfileClick = (event) => {
    setopenProfile(event.currentTarget);
  };

  const handleProfileClose = () => {
    setopenProfile(null);
  };

  const profileMenu = [
    {
      to: "/userprofile",
      icon: <UserOutlined />,
      text: "My Profile",
    },
    {
      to: "/",
      icon: <SettingOutlined />,
      text: "Settings",
    },
    {
      to: "/",
      icon: <LogoutOutlined />,
      text: "Logout",
    },
  ];

  return (
    <>
      <Tooltip title="Account Details" arrow>
        <div
          onClick={handleProfileClick}
          className={`${classes.accountBtn}`}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <div className={`${classes.userBoxImg}`}>
            <img src={defaultUser} alt="defaultUser" className={`${classes.userImg}`} />
            <DownOutlined className="text-other-Gray6 w-3" />
          </div>
          {/* <div className={`${classes.userSeparate}`}>
            <span className={`${classes.userName}`}>Dharmesh Kubavat</span>
          </div> */}
        </div>
      </Tooltip>

      <Menu
        anchorEl={openProfile}
        id="account-menu"
        open={open}
        onClick={handleProfileClose}
        onClose={handleProfileClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: "170px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
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
              right: 14,
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
        {profileMenu.map((item, index) => (
          <MenuItem key={index} className="menuHover !p-0">
            <Link to={item.to} className={`${classes.menuLink}`}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <span className={`${classes.menuName}`}>{item.text}</span>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AccountDetail;
