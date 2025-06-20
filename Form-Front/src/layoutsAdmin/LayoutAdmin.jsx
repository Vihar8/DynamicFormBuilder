import React, { useState } from "react";
import Header from "./Header/Header";
import SidebarMenu from "./SidebarMenu/SidebarMenu";

const LayoutAdmin = ({children}) => {
  const [menuCollapse, setMenuCollapse] = useState(true);

  return (
    <>
      <Header menuCollapse={menuCollapse} setMenuCollapse={setMenuCollapse} />

      <SidebarMenu menuCollapse={menuCollapse} />
      
      <div className={`adminLayout ${menuCollapse ? 'pl-0 md:pl-[76px]' : "pl-0 md:pl-[205px]"}`}>
        {children}
      </div>
    </>
  );
};

export default LayoutAdmin;
