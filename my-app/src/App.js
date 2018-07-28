import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "./logo.svg";
import "./App.css";

const dummySlides = [
  {
    slideType: "image",
    content_file_name: "https://imgs.xkcd.com/comics/software_development.png",
    links: [{ id: "TEST SLIDE" }],
    transition: "Default"
  },
  {
    slideType: "image",
    content_file_name: "https://imgs.xkcd.com/comics/good_code.png"
  }
];

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
    this.state = {
      slides: dummySlides
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
      selectedSlide: props.slides[0]
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
        <SlideViewer slide={this.state.selectedSlide} />
      </div>
    );
  }

  handleOverviewClick(i) {
    // let slides = this.state.slides;
    this.setState({ selectedSlide: this.props.slides[i] });
  }
}

const SlideViewer = props => {
  let slide = props.slide;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "solid 2px darkgrey",
        flexBasis: "80%",
        justifyContent: "space-between"
      }}
    >
      <ImageView image={slide.content_file_name} />
      <SlideDetail slide={slide} />
    </div>
  );
};

const SlideDetail = props => {
  let slideDetailsToDisplay = [];

  if (props.slide) {
    for (let prop in props.slide) {
      slideDetailsToDisplay.push(
        <li key={prop} style={{ textAlign: "left" }}>
          {prop + ": " + props.slide[prop]}
        </li>
      );
    }
  } else {
    slideDetailsToDisplay = [<li>No Slide Info </li>];
  }
  return (
    <div style={{ flexBasis: "15%" }}>
      <h3>Slide Details</h3> <br />
      <ul>{slideDetailsToDisplay}</ul>
    </div>
  );
};

const ImageView = props => {
  return (
    <div
      style={{
        borderWidth: 2,
        borderColor: "solid",
        borderStyle: "darkgrey",
        display: "flex",
        flexBasis: "75%",
        padding: "20 0"
      }}
      className="image-viewer"
    >
      <button style={{ flexBasis: "5%" }}>{"<"}</button>
      <img style={{ flexBasis: "90%" }} src={props.image} />
      <button style={{ flexBasis: "5%" }}>></button>
    </div>
  );
};

const OverviewSection = props => {
  var slidesToDisplay = [];
  if (props.slides) {
    props.slides.map((slide, index) => {
      slidesToDisplay.push(
        <SlideThumb
          index={index}
          slide={slide}
          onClick={() => props.onClick(index)}
          key={index}
        />
      );
    });
  } else {
    slidesToDisplay = [<span key="default">NO SLIDES FOUND</span>];
  }

  return (
    <div
      style={{
        borderWidth: 2,
        borderColor: "darkgrey",
        borderStyle: "solid",
        padding: 3,
        flexBasis: "20%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "blue"
      }}
      className="overview-section"
    >
      {slidesToDisplay.map((slide, i) => slide)}
    </div>
  );
};

const SlideThumb = props => {
  return (
    <img
      onClick={props.onClick}
      style={{ width: "100%", height: 120, paddingBottom: 3 }}
      src={props.slide.content_file_name}
    />
  );
};

export default App;
