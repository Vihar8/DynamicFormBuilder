// import { LogoutOutlined, SettingOutlined, UserOutlined, WalletOutlined } from "@ant-design/icons";
// import { Button, Grid, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
// import React, { useState } from "react";
// import classes from "../Header.module.scss";
// import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";
// import { userTypes } from "../../../utils/commonEnum";
// import Drawers from "../../../app/commoncomponents/Drawer/Drawer";

// const Accounts = () => {
//   const { user } = useAuth();
//   const [openProfile, setopenProfile] = useState(null);
//   const { logout } = useAuth(); 
//   const navigate = useNavigate();
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const toggleDrawer = (open) => () => {
//     setIsDrawerOpen(open);
//   };

//   const open = Boolean(openProfile);
//   const handleProfileClick = (event) => {
//     setopenProfile(event.currentTarget);
//   };

//   const handleProfileClose = () => {
//     setopenProfile(null);
//   };

//   const handleLogout = async () => {
//     try {
//       await logout(); // Call the logout function
//       navigate(`/`, {
//         state: { from: '' }, // Redirect after logout
//       });
//     } catch (err) {
//       // console.error(err); // Handle any errors
//     }
//   };

//   const profileMenu = [
//     // ...(user?.user_type === userTypes?.vendorLogin ? [
//       // {
//       //   to: "/profile",
//       //   icon: <UserOutlined />,
//       //   text: "Profile",
//       // },
//       // {
//       //   // to: "/profile",
//       //   icon: <WalletOutlined />,
//       //   text: "Wallet Balance",
//       //   onClick: toggleDrawer(true),
//       // },
//     // ]
//     // : []),
// //   ...(user?.user_type === userTypes?.agentsLogin
//     // ? [
// //       {
// //         to: "/changepassword",
// //         icon: <SettingOutlined />,
// //         text: "Change Password",
// //       },
// //     ] : []),
//     {
//       to: "/",
//       icon: <LogoutOutlined />,
//       text: "Logout",
//       onClick: handleLogout,
//     },
//   ];

//   return (
//     <>
//       <Tooltip title="Account Details" arrow>
//         <div
//           onClick={handleProfileClick}
//           className={`${classes.accountBtn}`}
//           aria-controls={open ? "account-menu" : undefined}
//           aria-haspopup="true"
//           aria-expanded={open ? "true" : undefined}
//         >
//           <img src="/assets/adminIcons/profileimg.png" alt="User Icon" className={`${classes.userIconSize}`} />
//           <div className={`${classes.userSeparate}`}>
//             <span className={`${classes.userName}`}>{user?.name}</span>
//             <span className={`${classes.userType}`}>
//               {user?.role === userTypes?.adminLogin
//                 ? "Admin"
//                 : user?.role === userTypes?.agentsLogin
//                 ? "Agent"
//                 : user?.role === userTypes?.consumersLogin
//                 ? "Consumer"
//                 : ""
//               }
//             </span>
//           </div>
//         </div>
//       </Tooltip>

//       <Menu
//         anchorEl={openProfile}
//         id="account-menu"
//         open={open}
//         onClick={handleProfileClose}
//         onClose={handleProfileClose}
//         PaperProps={{
//           elevation: 0,
//           sx: {
//             width: "200px",
//             overflow: "visible",
//             filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//             mt: 1.5,
//             "& .MuiAvatar-root": {
//               width: 32,
//               height: 32,
//               ml: -0.5,
//               mr: 1,
//             },
//             "&::before": {
//               content: '""',
//               display: "block",
//               position: "absolute",
//               top: 0,
//               right: 14,
//               width: 10,
//               height: 10,
//               bgcolor: "background.paper",
//               transform: "translateY(-50%) rotate(45deg)",
//               zIndex: 0,
//             },
//           },
//         }}
//         transformOrigin={{ horizontal: "right", vertical: "top" }}
//         anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//       >
//         {profileMenu.map((item, index) => (
//           <MenuItem key={index} className="menuHover !p-0" onClick={item.onClick}>
//             {item?.to?
//             <Link to={item.to} className={`${classes.menuLink}`}>
//               <ListItemIcon>{item.icon}</ListItemIcon>
//               <span className={`${classes.menuName}`}>{item.text}</span>
//             </Link>:
//              <p className={`${classes.menuLink}`}>
//              <ListItemIcon>{item.icon}</ListItemIcon>
//              <span className={`${classes.menuName}`}>{item.text}</span>
//            </p>}
//           </MenuItem>
//         ))}
//       </Menu>


      
//       <Drawers anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
//         <Grid container direction="column" p={2}>
    
//     {/* Header Section */}
//     <Grid item>
//       <Grid container alignItems="center" justifyContent="space-between">
//         <Grid item>
//           <img
//             src="/assets/adminIcons/notification.svg"
//             alt="User Icon"
//             className={`${classes.notificationIconSize}`}
//           />
//         </Grid>
//         <Grid item>
//           <p className={classes.username}>Vihar Modi</p>
//         </Grid>
//         <Grid item>
//           <img onClick={toggleDrawer(false)}
//             src="/assets/adminIcons/profileimg.png"
//             alt="User Icon"
//             className={`${classes.userIconnSize}`}
//           />
//         </Grid>
//       </Grid>
//     </Grid>

//     {/* Divider */}
//     <Grid item sx={{ width: "100%", height: "1px", backgroundColor: "#D3D3D3", mt: 2 }}></Grid>

//     {/* Credits Section */}
//     <Grid item mt={2}>
//       <p className={`${classes.sectiontitle}`}>Your Credits</p>

//       {/* Available Credits */}
//       <Grid
//         container
//         className={`${classes.creditcard}`}
//         sx={{ backgroundColor: "#F8E0B2", borderRadius: "12px", padding: 2 }}
//         alignItems="center"
//         justifyContent="space-between"
//       >
//         <Grid item>
//           <p className={`${classes.creditamount}`}>₹ 28.18</p>
//           <p className={`${classes.creditlabel}`}>
//             Available Credits
//           </p>
//         </Grid>
//         <Grid item>
//           <img
//             src="/assets/adminIcons/thunder.svg"
//             alt="User Icon"
//             className="bg-[#F6BE54] rounded-full w-16 h-16"
//           />
//         </Grid>
//       </Grid>

//       {/* Savings */}
//       <Grid
//         container
//         mt={2}
//         className={`${classes.creditcard}`}
//         sx={{ backgroundColor: "#B8E1CC", borderRadius: "12px", padding: 2 }}
//         alignItems="center"
//         justifyContent="space-between"
//       >
//         <Grid item>
//           <p className={`${classes.creditamount}`}>₹ 100.00</p>
//           <p className={`${classes.creditlabel}`}>
//             Savings so far
//           </p>
//         </Grid>
//         <Grid item>
//           <img
//             src="/assets/adminIcons/savingpiggy.svg"
//             alt="User Icon"
//             className="bg-[#F6BE54] rounded-full w-16 h-16"
//           />
//         </Grid>
//       </Grid>
//     </Grid>

//     {/* Divider */}
//     <Grid item sx={{ width: "100%", height: "1px", backgroundColor: "#D3D3D3", mt: 3 }}></Grid>

//     {/* Other Services Section */}
//     <Grid item mt={4}>
//       <p className={`${classes.sectiontitle}`}>Other Services</p>

//       {/* Service Card 1 */}
//       <Grid
//         container
//         className={`${classes.servicecard}`}
//         sx={{ padding: 2 }}
//         alignItems="center"
//         justifyContent="space-between"
//       >
//         <Grid item xs>
//           <p className={`${classes.servicetitle}`}>Power your EV with solar</p>
//           <p className={`${classes.servicedescription}`}>
//             Offset public charging of your EV with credits
//           </p>
//           <Link
//             to=""
//             className={`${classes.linkstyle}`}
//           >
//             Read more
//           </Link>
//         </Grid>
//         <Grid item>
//           <img
//             src="/assets/adminIcons/elecar.svg"
//             alt="User Icon"
//             className={`${classes.serviceimg}`}
//           />
//         </Grid>
//       </Grid>

//       {/* Service Card 2 */}
//       <Grid
//         container
//         className={`${classes.servicecard}`}
//         sx={{ padding: 2, mt: 2 }}
//         alignItems="center"
//         justifyContent="space-between"
//       >
//         <Grid item xs>
//           <p className={`${classes.servicetitle}`}>Invite your Community</p>
//           <p className={`${classes.servicedescription}`}>
//             Get benefits on your next power bill when your friends join.
//           </p>
//           <Link
//             to=""
//             className={`${classes.linkstyle}`}
//           >
//             Read more
//           </Link>
//         </Grid>
//         <Grid item>
//           <img
//             src="/assets/adminIcons/referin.svg"
//             alt="User Icon"
//             className={`${classes.serviceimg}`}
//           />
//         </Grid>
//       </Grid>
//     </Grid>

//     {/* Close Button */}

//     {/* <Grid item mt={3}>
//         <div>
//         <Button onClick={toggleDrawer(false)}>Close</Button>
//         </div>
//     </Grid> */}

//   </Grid>
//       </Drawers>
//     </>
//   );
// };

// export default Accounts;



"use client";

import React, { useState } from "react";
import { LogoutOutlined, SettingOutlined, UserOutlined, WalletOutlined } from "@ant-design/icons";
import { Button, Grid, ListItemIcon, Menu, MenuItem, Tooltip } from "@mui/material";
import classes from "../Header.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuth from "../../../hooks/useAuth";
import { userTypes } from "../../../utils/commonEnum";
import Drawers from "../../../app/commoncomponents/Drawer/Drawer";

const Accounts = () => {
  const { user, logout } = useAuth();
  const [openProfile, setOpenProfile] = useState(null);
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  const open = Boolean(openProfile);

  const handleProfileClick = (event) => {
    setOpenProfile(event.currentTarget);
  };

  const handleProfileClose = () => {
    setOpenProfile(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/"); // Redirect after logout
    } catch (err) {
      // console.error(err);
    }
  };

  const profileMenu = [
    {
      to: "/",
      icon: <LogoutOutlined />,
      text: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <Tooltip title="Account Details" arrow>
        <div
          onClick={handleProfileClick}
          className={classes.accountBtn}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <img src="/assets/adminIcons/profileimg.png" alt="User Icon" className={classes.userIconSize} />
          <div className={classes.userSeparate}>
            <span className={classes.userName}>{user?.name}</span>
            <span className={classes.userType}>
              {user?.role === userTypes?.adminLogin
                ? "Admin"
                : user?.role === userTypes?.agentsLogin
                ? "Agent"
                : user?.role === userTypes?.consumersLogin
                ? "Consumer"
                : ""}
            </span>
          </div>
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
            width: "200px",
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
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
          <MenuItem key={index} className="menuHover !p-0" onClick={item.onClick}>
            {item.to ? (
              <Link href={item.to} className={classes.menuLink}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <span className={classes.menuName}>{item.text}</span>
              </Link>
            ) : (
              <div className={classes.menuLink}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <span className={classes.menuName}>{item.text}</span>
              </div>
            )}
          </MenuItem>
        ))}
      </Menu>

      <Drawers anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Grid container direction="column" p={2}>
          {/* Header */}
          <Grid item>
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid item>
                <img src="/assets/adminIcons/notification.svg" alt="Notification" className={classes.notificationIconSize} />
              </Grid>
              <Grid item>
                <p className={classes.username}>Vihar Modi</p>
              </Grid>
              <Grid item>
                <img
                  onClick={toggleDrawer(false)}
                  src="/assets/adminIcons/profileimg.png"
                  alt="User Icon"
                  className={classes.userIconnSize}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Divider */}
          <Grid item sx={{ width: "100%", height: "1px", backgroundColor: "#D3D3D3", mt: 2 }}></Grid>

          {/* Credits */}
          <Grid item mt={2}>
            <p className={classes.sectiontitle}>Your Credits</p>

            <Grid container className={classes.creditcard} sx={{ backgroundColor: "#F8E0B2", borderRadius: "12px", padding: 2 }} alignItems="center" justifyContent="space-between">
              <Grid item>
                <p className={classes.creditamount}>₹ 28.18</p>
                <p className={classes.creditlabel}>Available Credits</p>
              </Grid>
              <Grid item>
                <img src="/assets/adminIcons/thunder.svg" alt="Thunder" className="bg-[#F6BE54] rounded-full w-16 h-16" />
              </Grid>
            </Grid>

            <Grid container mt={2} className={classes.creditcard} sx={{ backgroundColor: "#B8E1CC", borderRadius: "12px", padding: 2 }} alignItems="center" justifyContent="space-between">
              <Grid item>
                <p className={classes.creditamount}>₹ 100.00</p>
                <p className={classes.creditlabel}>Savings so far</p>
              </Grid>
              <Grid item>
                <img src="/assets/adminIcons/savingpiggy.svg" alt="Piggy" className="bg-[#F6BE54] rounded-full w-16 h-16" />
              </Grid>
            </Grid>
          </Grid>

          {/* Divider */}
          <Grid item sx={{ width: "100%", height: "1px", backgroundColor: "#D3D3D3", mt: 3 }}></Grid>

          {/* Services */}
          <Grid item mt={4}>
            <p className={classes.sectiontitle}>Other Services</p>

            <Grid container className={classes.servicecard} sx={{ padding: 2 }} alignItems="center" justifyContent="space-between">
              <Grid item xs>
                <p className={classes.servicetitle}>Power your EV with solar</p>
                <p className={classes.servicedescription}>Offset public charging of your EV with credits</p>
                <Link href="" className={classes.linkstyle}>Read more</Link>
              </Grid>
              <Grid item>
                <img src="/assets/adminIcons/elecar.svg" alt="EV" className={classes.serviceimg} />
              </Grid>
            </Grid>

            <Grid container className={classes.servicecard} sx={{ padding: 2, mt: 2 }} alignItems="center" justifyContent="space-between">
              <Grid item xs>
                <p className={classes.servicetitle}>Invite your Community</p>
                <p className={classes.servicedescription}>Get benefits on your next power bill when your friends join.</p>
                <Link href="" className={classes.linkstyle}>Read more</Link>
              </Grid>
              <Grid item>
                <img src="/assets/adminIcons/referin.svg" alt="Refer" className={classes.serviceimg} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Drawers>
    </>
  );
};

export default Accounts;
