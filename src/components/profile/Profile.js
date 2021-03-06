import React from "react";
import profile from "./profile.svg";
import "./Profile.css";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name
    };
  }

  onFormChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  onProfileSave = data => {
    const url = "https://enigmatic-fjord-57800.herokuapp.com/profile/";
    const id = this.props.user.id;
    const fetchURL = url + id;

    fetch(fetchURL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token")
      },
      body: JSON.stringify({ formInput: data })
    })
      .then(response => {
        if (response.ok || response.status === 304) {
          this.props.toggleModal();
          this.props.loadUser({ ...this.props.user, ...data });
        }
      })
      .catch(console.log);
  };

  render() {
    return (
      <div className="profile-modal">
        <article className="br3 ba b--black-10 mv5 w-100 w-50-m w-25-l mw6 shadow center bg-gradient">
          <main className="pa4 black-80 w-80">
            <img
              src={profile}
              className="br-100 ba h3 w3 dib center"
              style={{ border: "none" }}
              alt="avatar"
            />
            <div style={{ textAlign: "center" }}>
              <h1 className="fw6 f2 ofx">{this.state.name}</h1>
              <p className="fw3 f4">
                Images submitted: {this.props.user.entries}
              </p>
              <p className="normal f5">
                Member since:{" "}
                {new Date(this.props.user.joined).toLocaleDateString()}
              </p>
            </div>

            <br />
            <label className="mt2 fw6">Name</label>
            <input
              className="pa2 ba w-100"
              placeholder={this.state.name}
              type="text"
              name="user-name"
              id="name"
              onChange={this.onFormChange}
              maxLength="20"
            />
            <br />
            <br />
            <div className="buttons-section">
              <input
                className="b ph3 pv2 input-reset ba b--black myGrow pointer f4 dib center bg-save"
                type="submit"
                value="Save"
                onClick={() => this.onProfileSave(this.state)}
              />
              <input
                className="b ph3 pv2 input-reset ba b--black myGrow pointer f4 dib center bg-danger"
                type="submit"
                value="Cancel"
                onClick={this.props.toggleModal}
              />
            </div>
          </main>
          <span className="modal-close" onClick={this.props.toggleModal}>
            &times;
          </span>
        </article>
      </div>
    );
  }
}
