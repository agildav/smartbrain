import React from "react";
import Alert from "react-s-alert";
import "../form.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: ""
    };
  }

  onEmailChange = event => {
    this.setState({ signInEmail: event.target.value });
  };
  onPasswordChange = event => {
    this.setState({ signInPassword: event.target.value });
  };

  myAlert = () => {
    Alert.error(
      `<div class="">
        <svg class="w1" data-icon="info" viewBox="0 0 32 32"
          style="fill:currentcolor">
          <title>info icon</title>
          <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
        </svg>
        <span class="lh-title ml2">Oops, can't sign in.</span>
      </div>`,
      {
        position: "bottom-left",
        effect: "jelly",
        beep: false,
        timeout: 650,
        offset: 150,
        html: true
      }
    );
  };

  saveAuthTokenInSession = token => {
    window.sessionStorage.setItem("token", token);
  };

  onSubmitSignIn = () => {
    // TODO: Remove local dev
    const url = "http://localhost:3000/signin";
    //const url = "https://enigmatic-fjord-57800.herokuapp.com/signin";
    const fetchReq = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    };
    //  TODO: Fix get profile information, response from server
    fetch(url, fetchReq)
      .then(response => response.json())
      .then(data => {
        if (data.userID && data.success === "true") {
          this.saveAuthTokenInSession(data.token);
          //  TODO: Remove local dev
          const url = `http://localhost:3000/profile/${data.userID}`;
          const fetchReq = {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Authorization: data.token
            }
          };
          fetch(url, fetchReq)
            .then(response => response.json())
            .then(user => {
              if (user.email) {
                this.props.loadUser(user);
                this.props.onRouteChange("home");
              }
            })
            .catch(console.log);
        } else {
          this.myAlert();
        }
      })
      .catch(console.log);
  };

  render() {
    return (
      <article className="br3 ba b--black-10 mv5 w-100 w-50-m w-25-l mw6 shadow center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0 center">Sign in</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100 hover-black"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100 hover-black"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent myGrow pointer f4 dib center"
                type="submit"
                value="Sign in"
                onClick={this.onSubmitSignIn}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
