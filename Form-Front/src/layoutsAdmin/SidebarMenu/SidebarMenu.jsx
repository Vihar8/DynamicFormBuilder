"use client";

import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { styled, Tooltip, tooltipClasses } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "../../hooks/useAuth";
import { userTypes } from "../../utils/commonEnum";
import classes from "./SidebarMenu.module.scss";

const SidebarMenu = ({ menuCollapse }) => {
  const { user } = useAuth();
  const [toggled, setToggled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  let fullDashboardMenu = [];

  const adminMenu = [
    {
      menusName: "Dashboard",
      path: "dashboard",
      icons: <img src="./formlogo.png" className={classes.iconSize} />,
    },
    // {
    //   menusName: "Engine Oil",
    //   path: "engineoil-list",
    //   icons: <img src={adminuser.src} className={classes.iconSize} />,
    // },
    // {
    //   menusName: "Battery",
    //   path: "battery-list",
    //   icons: <img src={adminuser.src} className={classes.iconSize} />,
    // },
  ];

  const menuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    label: ({ open }) => ({
      fontWeight: open ? 700 : undefined,
    }),
  };

  switch (user?.role) {
    case userTypes.adminLogin:
      fullDashboardMenu = adminMenu;
      break;
    case userTypes.agentsLogin:
      fullDashboardMenu = []; // add your agent menu here
      break;
    case userTypes.consumersLogin:
      fullDashboardMenu = []; // add your consumer menu here
      break;
    default:
      fullDashboardMenu = adminMenu;
  }

 const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "rgba(31, 70, 125, 1)",
        color: "#ffffff",
        boxShadow: theme.shadows[1],
        fontSize: 14,
        padding: "5px 15px",
        },
    }));

  return (
    <div className={classes.sidebarSection}>
      <Sidebar
        className={`${classes.sidebarMain} ${menuCollapse ? "sidebarCollapse" : "sidebarNotCollapse"}`}
        collapsed={menuCollapse}
        toggled={toggled}
        width={menuCollapse ? "76px" : "205px"}
        onBackdropClick={() => setToggled(false)}
        breakPoint="sm"
      >
        <div className={classes.sidebarCard}>
          <Menu menuItemStyles={menuItemStyles}>
            {menuCollapse ? (
              <>
                {fullDashboardMenu.map((item, index) => (
                  <LightTooltip key={index} title={item.menusName} placement="right">
                    <MenuItem
                      icon={item.icons}
                      onClick={() => router.push(`/${item.path}`)}
                      className={`sidebarsMenu sidebarHideSubMenu ${pathname === `/${item.path}` ? "activeMainMenuItem" : ""}`}
                    >
                      {item.menusName}
                    </MenuItem>
                  </LightTooltip>
                ))}
              </>
            ) : (
              <>
                {fullDashboardMenu.map((item, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => router.push(`/${item.path}`)}
                    icon={item.icons}
                    className={`sidebarsMenu ${pathname === `/${item.path}` ? "activeMainMenuItem" : ""}`}
                  >
                    {item.menusName}
                  </MenuItem>
                ))}
              </>
            )}
          </Menu>
        </div>
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;
