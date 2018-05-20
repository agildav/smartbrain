import React, { Component } from "react";
import Navigation from "../components/navigation/Navigation";
import Logo from "../components/logo/Logo";
import Rank from "../components/rank/Rank";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import "tachyons";
import Particles from "react-particles-js";
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

class App extends Component {
  constructor() {
    super();
    this.state = { input: "" };
  }

  onChangeInput = event => {
    console.log(event.target.value);
  };

  onButtonSubmit = event => {
    console.log(event.target);
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
