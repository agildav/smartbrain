import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className="white center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          alt=""
          src={imageURL}
          width="350px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            bottom: box.bottomRow,
            left: box.leftCol,
            right: box.rightCol
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecognition;
