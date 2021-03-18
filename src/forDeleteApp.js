import React, { Component} from "react";
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

// function App() {
  class App extends Component {

    constructor(){
      super();
      this.state = {
        input:'',
        imageUrl:'',
        box:{},
        route:'_signin',
        isSignedIn:false
      }
    }
    // const  (input,imageUrl,box,route,isSignedIn) = this.state;


    
  // const [input, setInput] = useState(0);
  // const [imageURL, setImageURL] = useState("");
  // const [box, setBox] = useState({});
  // const [route, setRoute] = useState("_signin");
  // const [isSignedIn, setisSignedIn] = useState(false);

 componentDidMount (){

  fetch('http://localhost:3000/')
  .then(response=>response.json())
  .then(console.log)
}
   calculateFaceLocation = (data) => {
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
   displayFaceBox = (boxD) => {
     this.setState({box:boxD})
    // setBox(boxD);
    // console.log(box);
  };
   onInputChange = (e) => {
          this.setState({input:e.target.value})
    // setInput(e.target.value);
    console.log(e.target.value);
  };

   onButtonClick = () => {
          this.setState({imageUrl:this.state.input})
    // setImageURL(input);
    app.models
      .predict(
        // models:

        // https://github.com/Clarifai/clarifai-javascript/blob/master/src/index.js

        // determined the model type : like

        // detecting Colors recognation
        // Clarifai.COLOR_MODEL,

        // detecting Face recognation
        Clarifai.FACE_DETECT_MODEL,

        
      )
      .then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch((err) => console.log("Error", err));
  };

   onRoutechange = (route) => {
    if (route === "signout") {
      // setisSignedIn(false);
        this.setState({isSignedIn:false})
    } else if (route === "home") {
      // setisSignedIn(true);
        this.setState({isSignedIn:true})
      
    }
        this.setState({route:route})
  };
    render(){
  return (

    <div className="App">
      <Particles className="particles" params={particlesOption} />
      <Navigation onRouteChange={this.onRoutechange} isSignedIn={this.state.isSignedIn} />
      {this.state.route === "home" ? (
        <div>
          {" "}
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonClick={this.onButtonClick}
          />
          <FaceRecognation box={this.state.box} imageURL={this.state.imageURL} />
        </div>
      ) : this.state.route === "_signin" ||  this.state.route === "signout"  ? (
        <Signin onRouteChange={this.onRoutechange} />
      ) : (
        <Register onRouteChange={this.onRoutechange} />
      )}
    </div>
  );
    }
}

export default App;
