import React, { Component } from "react";
import Navigation from "../components/navigation/Navigation";
import Logo from "../components/logo/Logo";
import Rank from "../components/rank/Rank";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/faceRecognition/FaceRecognition";
import SignIn from "../components/signIn/SignIn";
import Register from "../components/register/Register";
import Modal from "../components/modal/Modal";
import Profile from "../components/profile/Profile";

import Particles from "react-particles-js";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/jelly.css";
import "./App.css";

const paramsParticles = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 750
      }
    }
  }
};

const initialState = {
  input: "",
  imageUrl: "",
  box: [],
  route: "signin",
  isSignedIn: false,

  isProfileOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    alert("Wait for server to wake up when you submit sign in / register");
    const token = window.sessionStorage.getItem("token");
    if (token) {
      const url = "https://enigmatic-fjord-57800.herokuapp.com/signin";
      const fetchReq = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      };
      fetch(url, fetchReq)
        .then(response => response.json())
        .then(data => {
          if (data.id) {
            const url = `https://enigmatic-fjord-57800.herokuapp.com/profile/${
              data.id
            }`;
            const fetchReq = {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              }
            };
            fetch(url, fetchReq)
              .then(response => response.json())
              .then(user => {
                if (user.email) {
                  this.loadUser(user);
                  this.onRouteChange("home");
                }
              });
          } else {
            this.myAlert();
          }
        })
        .catch(console.log);
    }
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  myAlert = () => {
    Alert.error(
      `<div class="">
        <svg class="w1" data-icon="info" viewBox="0 0 32 32"
          style="fill:currentcolor">
          <title>info icon</title>
          <path d="M16 0 A16 16 0 0 1 16 32 A16 16 0 0 1 16 0 M19 15 L13 15 L13 26 L19 26 z M16 6 A3 3 0 0 0 16 12 A3 3 0 0 0 16 6"></path>
        </svg>
        <span class="lh-title ml2">Oops, invalid URL or picture</span>
      </div>`,
      {
        position: "bottom-left",
        effect: "jelly",
        beep: false,
        timeout: 650,
        offset: 250,
        html: true
      }
    );
  };

  calculateFaceLocation = data => {
    if (data) {
      const image = document.getElementById("inputimage");
      const width = Number(image.width);
      const height = Number(image.height);
      return data.outputs[0].data.regions.map(face => {
        const clarifaiFace = face.region_info.bounding_box;
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - clarifaiFace.right_col * width,
          bottomRow: height - clarifaiFace.bottom_row * height
        };
      });
    }
    return;
  };

  displayFaceBox = box => {
    if (box) this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    if (this.state.input === "") {
      return this.myAlert();
    }
    this.setState({ imageUrl: this.state.input });

    const url_image = "https://enigmatic-fjord-57800.herokuapp.com/imageurl";

    fetch(url_image, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return this.myAlert();
        }
      })
      .then(response => {
        if (response) {
          const url_image_face =
            "https://enigmatic-fjord-57800.herokuapp.com/image";

          fetch(url_image_face, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: window.sessionStorage.getItem("token")
            },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "signout") {
      const url = "https://enigmatic-fjord-57800.herokuapp.com/signout";

      fetch(url, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: window.sessionStorage.getItem("token")
        }
      })
        .then(response => {
          if (response.ok) {
            window.sessionStorage.removeItem("token");
            return response.json();
          } else {
            return this.myAlert();
          }
        })
        .then(response => {
          if (response) return this.setState(initialState);
        })
        .catch(err => console.log(err));
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  };

  render() {
    const { isSignedIn, imageUrl, route, box, isProfileOpen } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={paramsParticles} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
          toggleModal={this.toggleModal}
        />
        {isProfileOpen && (
          <Modal>
            <Profile
              toggleModal={this.toggleModal}
              user={this.state.user}
              loadUser={this.loadUser}
            />
          </Modal>
        )}
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" || route === "signout" ? (
          <div>
            <SignIn
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          </div>
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
        <Alert stack={{ limit: 3, spacing: 30 }} />
      </div>
    );
  }
}

export default App;
