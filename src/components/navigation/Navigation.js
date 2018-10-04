import React from "react";
import ProfileAvatar from "../profileAvatar/ProfileAvatar";

const Navigation = ({ onRouteChange, isSignedIn, toggleModal }) => {
  if (isSignedIn) {
    return (
      <nav className="justify-end flex">
        <ProfileAvatar
          onRouteChange={onRouteChange}
          toggleModal={toggleModal}
        />
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
