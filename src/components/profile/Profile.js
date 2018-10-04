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
          <div style={{ textAlign: "center" }}>
            <h1 className="fw6 f2">John Doe</h1>
            <p className="fw3 f4">Images submitted: 5</p>
            <p className="normal f5">Member since: January</p>
          </div>

          <br />
          <label className="mt2 fw6">Name</label>
          <input
            className="pa2 ba w-100"
            placeholder="john"
            type="text"
            name="user-name"
            id="name"
          />
          <br />
          <br />
          <div className="buttons-section">
            <input
              className="b ph3 pv2 input-reset ba b--black myGrow pointer f4 dib center bg-save"
              type="submit"
              value="Save"
              onClick={this.onSubmitSignIn}
            />
            <input
              className="b ph3 pv2 input-reset ba b--black myGrow pointer f4 dib center bg-danger"
              type="submit"
              value="Cancel"
              onClick={this.onSubmitSignIn}
            />
          </div>
        </main>
      </article>
    </div>
  );
};
export default Profile;
