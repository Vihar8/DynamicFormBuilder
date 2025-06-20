import React from "react";
import classes from "../Footer.module.scss";
import Link from "next/link";

const NavigationMenu = () => {
  const navMenu = [
    { id: 1, to: "/", label: "Guarantee Warranty" },
    { id: 2, to: "/", label: "About Us" },
    { id: 3, to: "/", label: "Contact Us" },
    // { id: 4, to: "/termsconditions", label: "Terms & Conditions" },
    // { id: 5, to: "/privacypolicy", label: "Privacy Policy" },
    // { id: 3, to: "/", label: "Policy Update" },
    // { id: 4, to: "/", label: "Benefits Of EV" },
    // { id: 5, to: "/", label: "Resources" },
    // { id: 6, to: "/", label: "EV Dashboard" },
    // { id: 7, to: "/", label: "Guidelines" },
    // { id: 8, to: "/", label: "EV Search" },
    // { id: 9, to: "/", label: "EV Pledge" },
    // { id: 10, to: "/", label: "Campaigns" },
    // { id: 12, to: "/", label: "Terms & Conditions" },
  ];

  const navQuick = [
    { id: 1, to: "/", label: "Quick links 1" },
    { id: 2, to: "/", label: "Quick links 2" },
    { id: 3, to: "/", label: "Quick links 3" },
  ];

  // Split the menu into two columns
  const firstColumn = navMenu.slice(0, 7); // ids 1 to 7
  const secondColumn = navQuick.slice(0, 7); // ids 7 and beyond


  return (
    <div className={`${classes.navmenuDivide}`}>
      {/* <div className={`${classes.footerDivide}`}>
        {firstColumn.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            className={`${classes.navigateMenu}`}
          >
            {link.label}
          </Link>
        ))}
      </div> */}

      <div className={`${classes.footerDivide}`}>
      <h4 className={`${classes.footerHeading} !mb-2`}>Quick links</h4>
        {firstColumn.map((link) => (
          <Link
            key={link.id}
            href={link.to}
            className={`${classes.navigateMenu}`}
          >
            {link.label}
          </Link>
        ))}
      </div>


      {/* <div>
        <h4 className={`${classes.footerHeading} !mb-2`}>Quick links</h4>
        <div className={`${classes.footerDivide}`}>
          {secondColumn.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              className={`${classes.navigateMenu}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div> */}

    </div>
  );
};

export default NavigationMenu;
