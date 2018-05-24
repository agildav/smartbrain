import React from "react";
import brain from "./brain.png";
import Tilt from "react-tilt";

const Logo = () => {
  return (
    <div className="center mb0">
      <Tilt
        className="Tilt"
        options={{ max: 60 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa2">
          <img alt="Logo" src={brain} />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
