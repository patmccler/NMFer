import React, { Component } from "react";
import PropTypes from "prop-types";
import OverviewSection from "./OverviewSection.js";
import SlideViewer from "./SlideViewer.js";
import ZipLoader from "zip-loader";
import "./App.css";

import dummyNMF from "./data/dummyNMF.json";
const windowsNMFPath = "./data/windows-cust-install-prep.nmf";

//TODO add this in <input type="file" id="input-file" />
//     <button onClick={getFile}>Select File</button>

var getFile = function getFile() {
  var files = document.getElementById("input-file").files;

  if (files[0]) {
    var fr = new FileReader();

    fr.onload = e => {
      console.log(fr);
      var file = fr.result;
      console.log(fr.result);
      unpackFile(file);
      //console.log(file);

      //var fileObj = JSON.parse(file);
      //console.log(fileObj);
    };

    fr.readAsDataURL(files[0]);

    console.log(files[0]);
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    console.log(dummyNMF);
    this.state = {
      slides: dummyNMF.slides,
      width: window.innerWidth,
      height: window.innerHeight,
      resizeTimeout: null
    };
    //this.handleResize = this.handleResize.bind(this);
    this.resizeThrottler = this.resizeThrottler.bind(this);

    window.addEventListener("resize", this.resizeThrottler, false);
  }

  render() {
    return (
      <div className="App">
        <Main
          width={this.state.width}
          height={this.state.height}
          slides={this.state.slides}
        />
      </div>
    );
  }

  resizeThrottler = function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!this.state.resizeTimeout) {
      this.setState({
        resizeTimeout: setTimeout(
          () => {
            this.handleResize();
            this.setState({ resizeTimeout: null });

            // The actualResizeHandler will execute at a rate of 15fps
          },
          200,
          this
        )
      });
    }
  };
  handleResize = function handleResize() {
    console.log("handle resize");
    this.setState({
      height: window.innerHeight,
      width: (window.innerHeight * 4) / 3
    });
  };
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSlide: props.slides[props.initialSlide],
      selectedSlideIndex: props.initialSlide
    };
  }
  render() {
    return (
      <div
        style={{
          width: this.props.width,
          height: this.props.height
        }}
        className="main"
      >
        <OverviewSection
          onClick={i => this.handleOverviewClick(i)}
          slides={this.props.slides}
          selectedSlide={this.state.selectedSlideIndex}
          width={this.props.width * 0.2}
        />
        <SlideViewer
          onClick={i => this.handleOverviewClick(i)}
          slideNumber={this.state.selectedSlideIndex + 1}
          slide={this.state.selectedSlide}
          width={this.props.width * 0.8}
        />
      </div>
    );
  }

  handleOverviewClick(i) {
    if (i >= this.props.slides.length || i < 0) {
      return;
    }

    // let slides = this.state.slides;
    this.setState({
      selectedSlide: this.props.slides[i],
      selectedSlideIndex: i
    });
  }
}

Main.defaultProps = {
  initialSlide: 0
};

function unpackFile(file) {
  console.log("Unpacking file");
  var loader = new ZipLoader(file);

  loader.load.then(() => {
    console.log("loaded!");
    console.log(loader.files);
  });

  // ZipLoader.unzip(file).then(ZipLoaderInstance => {
  //   console.log("Hello");
  //   console.log(ZipLoaderInstance.files);
  //});
}

// const OverviewSection = props => {
//   var slidesToDisplay = [];
//   if (props.slides) {
//     props.slides.map((slide, index) => {
//       slidesToDisplay.push(
//         <SlideThumb
//           index={index}
//           slide={slide}
//           onClick={() => props.onClick(index)}
//           key={index}
//         />
//       );
//     });
//   } else {
//     slidesToDisplay = [<span key="default">NO SLIDES FOUND</span>];
//   }

//   return (
//     <div
//       style={{
//         borderWidth: 2,
//         borderColor: "darkgrey",
//         borderStyle: "solid",
//         padding: 3,
//         flexBasis: "20%",
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "blue"
//       }}
//       className="overview-section"
//     >
//       {slidesToDisplay.map((slide, i) => slide)}
//     </div>
//   );
// };

// const SlideThumb = props => {
//   return (
//     <img
//       onClick={props.onClick}
//       style={{ width: "100%", height: 120, paddingBottom: 3 }}
//       src={props.slide.content_file_name}
//     />
//   );
// };

export default App;
