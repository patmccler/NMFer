import React, { Component } from "react";
import PropTypes from "prop-types";
import OverviewSection from "./OverviewSection.js";
import SlideViewer from "./SlideViewer.js";
import "./App.css";

import dummyNMF from "./data/dummyNMF.json";
const windowsNMFPath = "./data/windows-cust-install-prep.nmf";

var FilePicker = props => {
  return (
    <div>
      <input type="file" id="input-file" />
      <button onClick={props.onClick}>Select File</button>
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //  slides: dummyNMF.slides,
      width: window.innerWidth,
      height: window.innerHeight,
      layout: "wide",
      resizeTimeout: null,
      content: {}
    };
    //this.handleResize = this.handleResize.bind(this);
    this.resizeThrottler = this.resizeThrottler.bind(this);
    this.getFile = this.getFile.bind(this);
    this.unpackFile = this.unpackFile.bind(this);

    window.addEventListener("resize", this.resizeThrottler, false);
  }

  render() {
    return (
      <div className="App">
        {this.state.slides ? (
          <Main
            width={this.state.width}
            height={this.state.height}
            layout={this.state.layout}
            slides={this.state.slides}
            content={this.state.content}
          />
        ) : (
          <FilePicker onClick={this.getFile} />
        )}
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
    let width = window.innerWidth;
    let height = window.innerHeight;

    let layout = this.determineLayout(width, height);
    console.log("handle resize");
    this.setState({
      height,
      width,
      layout
    });
  };

  determineLayout = function determineLayout(width, height) {
    //2 side panel layout - wide
    let imageWidth =
      width - this.props.overviewMaxWidth - this.props.detailMaxWidth;

    //side and bottom panel layout - tall
    let imageHeight = height - this.props.detailMaxHeight;

    return (imageWidth * 3) / 4 > imageHeight ? "wide" : "tall";
  };

  getFile = function getFile() {
    var files = document.getElementById("input-file").files;

    if (files[0]) {
      let fileName = files[0].name;
      this.unpackFile(files[0], fileName);
      //
    }
  };

  // todo probably use zip.js
  unpackFile = (file, fileName) => {
    let fileExtension = /(?:\.([^.]+))?$/.exec(fileName)[1].toLowerCase();

    console.log(fileName);
    console.log(file);

    switch (fileExtension) {
      case "json":
        console.log("Parsing JSON");
        console.log(file);
        var fr = new FileReader();

        fr.onload = e => {
          var file = fr.result;
          console.log(fr.result);

          this.setState({ slides: JSON.parse(fr.result).slides });
        };

        fr.readAsText(file);
        break;

      case "nmf":
      case "zip":
        if (fileExtension === ".nmf") {
          fileName = file.name.replace("nmf", "zip");
        }
        console.log("zip file");

        window.zip.createReader(new window.zip.BlobReader(file), zipReader => {
          zipReader.getEntries(entries => {
            console.log(entries);

            entries.map(entry => {
              let fileName = entry.filename;
              if (fileName.includes("__") || fileName.includes("/.")) return; //zip seems to include __MACOX/each file .. dunno

              if (fileName.includes("manifest.json")) {
                console.log(entry);
                entry.getData(new window.zip.TextWriter(), file => {
                  console.log(file);
                  this.setState({ slides: JSON.parse(file).slides });
                });
              } else if (fileName.includes("content")) {
                entry.getData(new window.zip.BlobWriter(), file => {
                  console.log(entry);
                  this.setState((prevState, props) => {
                    let content = prevState.content;
                    content[fileName] = file;
                    console.log(content);
                    return { content };
                  });
                });
              }
            });
          });

          console.log(zipReader);
        });
        break;

      default:
        console.log("unsupported file type");
    }
  };
}

App.defaultProps = {
  overviewMaxWidth: 200,
  detailMaxHeight: 200,
  detailMaxWidth: 200
};

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
        className={"main " + this.props.layout}
      >
        <OverviewSection
          onClick={i => this.handleOverviewClick(i)}
          slides={this.props.slides}
          content={this.props.content}
          selectedSlide={this.state.selectedSlideIndex}
        />
        <SlideViewer
          layout={this.props.layout}
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

export default App;
