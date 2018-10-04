import React from "react";
import "./Profile.css";

const Profile = ({ toggleModal }) => {
  return (
    <div className="profile-modal">
      <button onClick={toggleModal}>Click me</button>
    </div>
  );
};
export default Profile;
