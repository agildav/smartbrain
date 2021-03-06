import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className="pa1 mb3 mt3 f3 center black tracked">{"Try it"}</p>
      <div className="center">
        <div className="center pa4 br4 shadow pattern width">
          <input
            className="f4 w-60 pa2"
            type="text"
            placeholder="http://www.face-sample.jpg"
            onChange={onInputChange}
          />
          <button
            className="f4 w-40 myGrow link pointer dib white bg"
            onClick={onButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
