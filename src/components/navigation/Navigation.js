import React from "react";
import "tachyons";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav className="justify-end flex">
      <p className="dim f2 pointer pa3 link black myGrow ma3 underline">
        Sign Out
      </p>
    </nav>
  );
};

export default Navigation;
