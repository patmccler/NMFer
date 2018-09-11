import React, { Component } from "react";
import PropTypes from "prop-types";
import MainContainer from "./MainContainer.js";
import "./App.css";

//App controls the sizing of the page and determines which layout to use
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //  slides: dummyNMF.slides,
      configs: {
        layout: "wide"
      },
      resizeTimeout: null
    };
    //this.handleResize = this.handleResize.bind(this);
    this.resizeThrottler = this.resizeThrottler.bind(this);

    window.addEventListener("resize", this.resizeThrottler, false);
  }

  render() {
    return (
      <div className="App">
        <MainContainer {...this.state.configs} />
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
      configs: {
        layout
      }
    });
  };

  //TODO this math needs checking - seems off
  determineLayout = function determineLayout(width, height) {
    //2 side panel layout - wide
    let imageWidth =
      width - this.props.overviewMaxWidth - this.props.detailMaxWidth;

    //side and bottom panel layout - tall
    let imageHeight = height - this.props.detailMaxHeight;

    return (imageWidth * 3) / 4 > imageHeight ? "wide" : "tall";
  };
}

//TODO use these to determine width and height of sidebars on app
App.defaultProps = {
  overviewMaxWidth: 200,
  detailMaxHeight: 200,
  detailMaxWidth: 200
};

export default App;
