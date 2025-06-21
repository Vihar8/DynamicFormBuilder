import React from "react";
import classes from "./Footer.module.scss";
import Container from "../../app/commoncomponents/Container/Container";
import NavigationMenu from "./NavigationMenu/NavigationMenu";
import { Grid } from "@mui/material";
import Link from "next/link";

const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <>
      <div className={`${classes.footerbg}`}>
        <Container>
          <Grid
            container
            rowSpacing={{ xs: 3, sm: 0, md: 0, lg: 0 }}
            columnSpacing={{ xs: 0, sm: 2, md: 0, lg: 3 }}
            className="!mt-0"
          >
            <Grid item xs={12} sm={4.5} md={4.5} lg={5}>
             <div className={`${classes.footerImg}`}>
                <img alt="Logo" src="./formlogo.png" className="w-[108px]" />
              </div>
              <div className={`${classes.footerDivide}`}>
                <h4 className={`${classes.footerHeading}`}>
                    Dynamic Form Builder
                </h4>
                {/* <p className={`${classes.footerText}`}>
                Suman Tower, Sector 11, Gandhinagar, Gujarat 382011
                </p> */}

                <p className={`${classes.emailText}`}>
                    <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        d="M3 6H21V18H3V6ZM5 8V9.19727L12 13.1973L19 9.19727V8H5ZM5 10.8027V16H19V10.8027L12 14.8027L5 10.8027Z"
                        fill="#ffffff"
                    />
                    </svg>

                  <Link
                    href="mailto:viharmodi2003@gmail.com"
                  >
                    viharmodi2003@gmail.com
                  </Link>
                </p>

                <p className={`${classes.emailText} contactWrapper`}>
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.654 1.328a.678.678 0 0 1 .58-.325h2.59c.24 0 .463.112.601.294l1.789 2.387a.678.678 0 0 1-.081.903L6.342 7.37a.678.678 0 0 0-.144.746c.297.73.698 1.411 1.287 2 .59.588 1.271.989 2 .287a.678.678 0 0 0 .746-.144l2.06-2.062a.678.678 0 0 1 .903-.081l2.386 1.79c.182.138.294.36.294.6v2.59a.678.678 0 0 1-.325.58c-1.062.655-3.01 1.293-5.46.39-2.444-.9-5.348-3.805-6.248-6.249-.902-2.45-.263-4.398.392-5.46z" />
                    </svg>
                  </span>
                  <Link href="tel:+918160302155">+91 8160302155</Link>
                </p>

              </div>
            </Grid>

            <Grid item xs={12} sm={5.5} md={5.5} lg={4}>
              <div className={`${classes.footerDivide}`}>
                <NavigationMenu />
              </div>
            </Grid>

            {/* <Grid item xs={12} sm={2} md={2} lg={3}>
                <div className={`${classes.footerDivide}`}>
                 <NavigationMenu />
                </div>
            </Grid> */}
          </Grid>
        </Container>
      </div>
      <div className={`${classes.footerBottombg}`}>
        <Container>
          <p className={`${classes.copyrightText}`}>
            Copyright &copy; {getCurrentYear()} DYNAMIC FORM BUILDER.
            All rights reserved
          </p>
        </Container>
      </div>
    </>
  );
};

export default Footer;
