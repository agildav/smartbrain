import React, { Component } from "react";
import Navigation from "../components/Navigation";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        {/*TODO
          {<Logo />
          <ImageLinkForm />
          <FaceRecognition />} 
        */}
      </div>
    );
  }
}

export default App;
