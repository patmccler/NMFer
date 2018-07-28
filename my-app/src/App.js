import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "./logo.svg";
import "./App.css";

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
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

class Main extends Component {
  render() {
    return (
      <div
        className="Main"
        style={{
          height: 500,
          width: 800,
          display: "flex"
        }}
      >
        <OverviewSection />
        <SlideViewer />
      </div>
    );
  }
}

const SlideViewer = props => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "dashed 5px black"
      }}
    >
      <ImageView />
      <SlideContent />
    </div>
  );
};

const SlideContent = props => {
  return <div style={{ flexBasis: "20%" }}>Slide Info will go here</div>;
};

const ImageView = props => {
  return (
    <div
      style={{
        borderWidth: 5,
        borderColor: "black",
        borderStyle: "dashed",
        display: "flex",
        flexBasis: "80%"
      }}
      className="slide-viewer"
    >
      <button style={{ flexBasis: "5%" }}>{"<"}</button>
      <img
        style={{ flexBasis: "90%" }}
        src="https://imgs.xkcd.com/comics/software_development.png"
      />
      <button style={{ flexBasis: "5%" }}>></button>
    </div>
  );
};

const OverviewSection = props => {
  return (
    <div
      style={{
        borderWidth: 5,
        borderColor: "black",
        borderStyle: "dashed",
        flexBasis: "20%"
      }}
      className="overview-section"
    >
      slideList will display here;
    </div>
  );
};

export default App;
