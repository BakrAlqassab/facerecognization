import React from "react";

function FaceRecognation({ imageURL }) {
  return (
    <div className="center ma">
    {/* mt2 = margin top:2 */}
      <div className="absolute mt3 ">
        <img alt="face recognation" src={imageURL}  width='500px' height='auto'/>
      </div>
    </div>
  );
}

export default FaceRecognation;
