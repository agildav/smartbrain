import React, { Component } from "react";
import Navigation from "../components/navigation/Navigation";
import Logo from "../components/logo/Logo";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        {/*TODO
          <ImageLinkForm />
          <FaceRecognition />} 
        */}
      </div>
    );
  }
}

export default App;
