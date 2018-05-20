import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "../components/navigation/Navigation";
import Logo from "../components/logo/Logo";
import Rank from "../components/rank/Rank";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import "tachyons";
import Clarifai from "clarifai";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "e5ffb161cb2347a3a674cca3c60c5c65"
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
    this.state = { input: "" };
  }

  onChangeInput = event => {
    console.log(event.target.value);
  };

  onButtonSubmit = event => {
    app.models
      .predict(
        Clarifai.GENERAL_MODEL,
        "https://samples.clarifai.com/metro-north.jpg"
      )
      .then(
        function(response) {
          // do something with response
          console.log(response);
        },
        function(err) {
          // there was an error
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
        <Particles className="particles" params={paramsParticles} />
        {/*TODO:
          <FaceRecognition />} 
        */}
      </div>
    );
  }
}

export default App;
