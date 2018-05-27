import React from "react";

const Navigation = ({ onRouteChange }) => {
  return (
    <nav className="justify-end flex">
      <p
        className="dim f2 pointer pa3 link black myGrow ma3 underline"
        onClick={() => onRouteChange("signIn")}
      >
        Sign Out
      </p>
    </nav>
  );
};

export default Navigation;
