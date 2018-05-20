import React, { Component } from "react";
import Navigation from "../components/navigation/Navigation";
import Logo from "../components/logo/Logo";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import "tachyons";
import Particles from "react-particles-js";
import "./App.css";

const paramsParticles = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 300
      }
    }
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLinkForm />
        <Particles className="particles" params={paramsParticles} />
        {/*TODO:
          <FaceRecognition />} 
        */}
      </div>
    );
  }
}

export default App;
