import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <div className="layout">
        <Sidebar />
        <div className="layout__headerChildren">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
