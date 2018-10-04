import React from "react";

const Profile = ({ toggleModal }) => {
  return (
    <div className="center mb0">
      <div className="pa2">
        <button onClick={toggleModal}>Modal content here</button>
      </div>
    </div>
  );
};

export default Profile;
