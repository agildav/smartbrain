import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "../components/navigation/Navigation";
import Logo from "../components/logo/Logo";
import Rank from "../components/rank/Rank";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/faceRecognition/FaceRecognition";
import "tachyons";
import Clarifai from "clarifai";
import SignIn from "../components/signIn/SignIn";
import "./App.css";

//  Clarifai
const clarifai_model = "a403429f2ddf4b49b307e318f00e528b";
const clarifai_key = "e5ffb161cb2347a3a674cca3c60c5c65";

const app = new Clarifai.App({
  apiKey: clarifai_key
});

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: "signIn"
    };
  }

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
    app.models
      .predict(clarifai_model, this.state.input)
      .then(response => {
        this.displayFaceBox(this.calculateFace(response));
      })
      .catch(err => {
        // there was an error
        console.log(err);
      });
  };

  onRouteChange = route => {
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={paramsParticles} />
        {
          // SignIn Route
        }
        {this.state.route === "signIn" ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <div>
            <Navigation onRouteChange={this.onRouteChange} />
            <Logo />
            <Rank />
            <ImageLinkForm
              onChangeInput={this.onChangeInput}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageURL={this.state.imageURL}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
