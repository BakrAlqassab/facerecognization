import React from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import "tachyons";
import Particles from "react-particles-js";

const particlesOption = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 1000,
      },
    },
  }
  ,
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'repulse'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
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
    }
};
// Stop the properties popup when click moues's right
// window.oncontextmenu = function (event) {
//   event.preventDefault();
//   event.stopPropagation();
//   return false;
// };
function App() {
  return (
    <div className="App">
      <Particles className="particles" params={particlesOption} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*  <ImageReconation/> */}
    </div>
  );
}

export default App;
