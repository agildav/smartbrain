import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "../components/navigation/Navigation";
import Logo from "../components/logo/Logo";
import Rank from "../components/rank/Rank";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/faceRecognition/FaceRecognition";
import "tachyons";
import Clarifai from "clarifai";
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
    this.state = { input: "", imageURL: "" };
  }

  onChangeInput = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    app.models.predict(clarifai_model, this.state.input).then(
      function(response) {
        // do something with response
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        // there was an error
        console.log(err);
      }
    );
  };

  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onChangeInput={this.onChangeInput}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageURL={this.state.imageURL} />
        <Particles className="particles" params={paramsParticles} />
      </div>
    );
  }
}

export default App;
