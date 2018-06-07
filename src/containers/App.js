import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "../components/navigation/Navigation";
import Logo from "../components/logo/Logo";
import Rank from "../components/rank/Rank";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/faceRecognition/FaceRecognition";
import "tachyons";
import SignIn from "../components/signIn/SignIn";
import Register from "../components/register/Register";
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
  box: {},
  route: "signIn",
  isSignedIn: false,
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

  onChangeInput = event => {
    this.setState({ input: event.target.value });
  };

  calculateFace = data => {
    //TODO: Detect multiple faces
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");

    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - clarifaiFace.right_col * width,
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = boxData => {
    this.setState({ box: boxData });
  };

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch("http://localhost:3000/imageurl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
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
        this.displayFaceBox(this.calculateFace(response));
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "home") {
      this.setState({ isSignedIn: true });
    } else if (route === "signOut") {
      this.setState(initialState);
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageURL, box, route } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={paramsParticles} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {
          // Home Route
        }
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onChangeInput={this.onChangeInput}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageURL={imageURL} />
          </div>
        ) : route === "signIn" || route === "signOut" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
              <Register
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />
            )}
      </div>
    );
  }
}

export default App;
