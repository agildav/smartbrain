import React, { Component } from "react";
import Navigation from "../components/navigation/Navigation";
import Logo from "../components/logo/Logo";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import "tachyons";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <ImageLinkForm />
        {/*TODO
          <FaceRecognition />} 
        */}
      </div>
    );
  }
}

export default App;
