import React from "react";
import Alert from "react-s-alert";

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
    Alert.error(`<h3>Oops, can't sign in</h3>`, {
      position: "bottom-left",
      effect: "jelly",
      beep: false,
      timeout: 2000,
      offset: 150,
      html: true
    });
  };

  onSubmitSignIn = () => {
    const url = "http://localhost:3000/signin";
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

    fetch(url, fetchReq)
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        } else {
          this.myAlert();
        }
      });
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
                  className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100"
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
                  className="b pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100"
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
