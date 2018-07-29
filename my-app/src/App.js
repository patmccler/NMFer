import React, { Component } from "react";
import PropTypes from "prop-types";
import OverviewSection from "./OverviewSection.js";
import SlideViewer from "./SlideViewer.js";
import "./App.css";

import dummyNMF from "./data/dummyNMF.json";

var getFile = function getFile() {
  var files = document.getElementById("input-file").files;

  if (files[0]) {
    var fr = new FileReader();

    fr.onload = e => {
      var file = fr.result;
      console.log(file);

      var fileObj = JSON.parse(file);
      console.log(fileObj);
    };

    fr.readAsText(files[0]);

    console.log(files[0]);
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    console.log(dummyNMF);
    this.state = {
      slides: dummyNMF.slides
    };
  }

  render() {
    return (
      <div className="App">
        <Main slides={this.state.slides} />
      </div>
    );
  }
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
        className="Main"
        style={{
          height: 750,
          width: 1000,
          display: "flex"
        }}
      >
        <OverviewSection
          onClick={i => this.handleOverviewClick(i)}
          slides={this.props.slides}
        />
        <SlideViewer
          onClick={i => this.handleOverviewClick(i)}
          slideNumber={this.state.selectedSlideIndex + 1}
          slide={this.state.selectedSlide}
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
