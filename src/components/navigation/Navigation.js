import React from "react";
import ProfileAvatar from "../profileAvatar/ProfileAvatar";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="justify-end flex">
        <ProfileAvatar />
        <p
          className="dim f3 pointer pa3 link black myGrow ma3 underline"
          onClick={() => onRouteChange("signout")}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav className="justify-end flex">
        <p
          className="dim f3 pointer pa3 link black myGrow ma3 underline"
          onClick={() => onRouteChange("signin")}
        >
          Sign In
        </p>
        <p
          className="dim f3 pointer pa3 link black myGrow ma3 underline"
          onClick={() => onRouteChange("register")}
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
