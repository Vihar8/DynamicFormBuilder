import React from "react";
import classes from "./Header.module.scss";
import Container from "../../app/commoncomponents/Container/Container";
import TopMenu from "./TopMenu/TopMenu";
import Link from "next/link";

const Header = () => {
  return (
    <header className={`${classes.header}`}>
      <div className={`${classes.headerSeparate}`}>
        <Container classname={`${classes.containDivide}`}>
          <Link href="/">
            <img
              className={`${classes.mainlogos}`}
              alt="Logo"
              src="./docu.jpg"
            />
          </Link>

          <div className={`${classes.rightSection}`}>
            <TopMenu />
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
