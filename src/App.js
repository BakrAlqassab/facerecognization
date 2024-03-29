import React, { useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognation from "./components/FaceRecognation/FaceRecognation";
import Rank from "./components/Rank/Rank";
import "tachyons";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  // apiKey: "INSERT YOUR API KEY HERE",
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
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("_signin");
  const [isSignedIn, setisSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });
  const loadUser = async (data) => {
    await setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
    // console.log(user);
  };
  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;

    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };
  const displayFaceBox = (boxD) => {
    setBox(boxD);
    console.log(box);
  };
  const onInputChange = (e) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  const onButtonClick = () => {
    setImageURL(input);
    app.models
      .predict(
        // models:

        // https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js

        // determined the model type : like

        // detecting Colors recognation
        // Clarifai.COLOR_MODEL,

        // detecting Face recognation
        Clarifai.FACE_DETECT_MODEL,

        input
      )
      .then((response) => displayFaceBox(calculateFaceLocation(response)))
      .catch((err) => console.log("Error", err));
  };

  const onRoutechange = (route) => {
    if (route === "signout") {
      setisSignedIn(false);
    } else if (route === "home") {
      setisSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <div className="App">
      <Particles className="particles" params={particlesOption} />
      <Navigation onRouteChange={onRoutechange} isSignedIn={isSignedIn} />
      {route === "home" ? (
        <div>
          {" "}
          <Logo />
          <Rank user={user}/>
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonClick={onButtonClick}
          />
          <FaceRecognation box={box} imageURL={imageURL} />
        </div>
      ) : route === "_signin" || route === "signout" ? (
        <Signin onRouteChange={onRoutechange}  loadUser={loadUser} />
      ) : (
        <Register onRouteChange={onRoutechange} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
