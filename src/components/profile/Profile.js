import React from "react";
import "./Profile.css";

const Profile = ({ toggleModal }) => {
  return (
    <div className="profile-modal">
      <article className="br3 ba b--black-10 mv5 w-100 w-50-m w-25-l mw6 shadow center bg-gradient">
        <main className="pa4 black-80 w-80">
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="br-100 ba h3 w3 dib"
            alt="avatar"
          />
          <h1>John Doe</h1>
          <h3>Images submitted: 5</h3>
          <h4>Member since: January</h4>
          <br />
          <label className="mt2 fw6">Name:</label>
          <input
            className="pa2 ba w-100"
            placeholder="john"
            type="text"
            name="user-name"
            id="name"
          />
        </main>
      </article>
    </div>
  );
};
export default Profile;
