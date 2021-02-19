import React from "react";
import './FaceRecognation.css'

function FaceRecognation({ imageURL, box }) {
  return (
  
    <div className="center ma">
      {/* mt2 = margin top:2 */}
      <div className="absolute mt3 ">
        <img
          id="inputimage"
          alt="face recognation"
          src={imageURL}
          width="580px"
          height="auto"
        />
        <div className="bounding-box" style={{top:box.topRow , right:box.rightCol, bottom:box.bottomRow ,left:box.leftCol }}></div>
      </div>
    </div>
  );
}

export default FaceRecognation;
