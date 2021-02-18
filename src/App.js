import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognation from "./components/FaceRecognation/FaceRecognation";
import Rank from "./components/Rank/Rank";
import "tachyons";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "a25e5a0341574b548cf187236a5592c4",
});
const particlesOption = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      // grab:{
      //   distance: 100,
      //   line_linked:{
      //     opacity: 1
      //   }
      // },
      // bubble:{
      //   distance: 200,
      //   size: 80,
      //   duration: 0.4
      // },
      // repulse:{
      //   distance: 200,
      //   duration: 0.4
      // },
      // push:{
      //   particles_nb: 4
      // },
      // remove:{
      //   particles_nb: 2
      // }
    },
    // mouse:{}
  },
};
// Stop the properties popup when click moues's right
// window.oncontextmenu = function (event) {
//   event.preventDefault();
//   event.stopPropagation();
//   return false;
// };

function App() {
  const [input, setInput] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const onInputChange = (e) => {
    setInput(e.target.value)
    console.log(e.target.value);
  };

  const onButtonClick = () => {
    setImageURL(input);
    app.models
      .predict(
        // determined the model type : like

        // detecting Colors recognation
        // Clarifai.COLOR_MODEL,

        // detecting Face recognation 
          Clarifai.FACE_DETECT_MODEL,
       input
      )
      .then(
        function (response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function (error) {}
      );
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOption} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonClick={onButtonClick}
      />
      <FaceRecognation imageURL={imageURL} />
    </div>
  );
}

export default App;
