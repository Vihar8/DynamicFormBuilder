import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import ScrollToTopButton from "../app/commoncomponents/ScrollToTopButton/ScrollToTopButton";

const Layout = ({children}) => {
  return (
    <>
      <Header />
    
      <div className="mainLayout">
        {children} {/* This is where your pages will render */}
      </div>

      <Footer />
      
      <ScrollToTopButton />
    </>
  );
};

export default Layout;
