import React from "react";

const FaceRecognition = ({ imageURL }) => {
  return (
    <div className="white center ma">
      <div className="mt2">
        <img alt="" src={imageURL} width="250px" height="auto" />
      </div>
    </div>
  );
};

export default FaceRecognition;
