import React, { Component } from "react";
import OverviewSection from "./OverviewSection.js";
import SlideViewer from "./SlideViewer.js";

class Main extends Component {
  constructor(props) {
    super(props);
    let selectedSlide = props.slides ? props.slides[props.initialSlide] : null;
    this.state = {
      selectedSlideIndex: props.initialSlide
    };
    this.handleOverviewClick = this.handleOverviewClick.bind(this);
  }
  render() {
    let selectedSlideIndex = this.state.selectedSlideIndex;
    return (
      <div
        style={{
          width: this.props.width,
          height: this.props.height
        }}
        className={"main " + this.props.layout}
      >
        <OverviewSection
          handleThumbClick={this.handleOverviewClick}
          slides={this.props.slides}
          selectedSlide={selectedSlideIndex}
        />
        <SlideViewer
          layout={this.props.layout}
          onClick={this.handleOverviewClick}
          slideIndex={selectedSlideIndex}
          slide={this.props.slides[selectedSlideIndex]}
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
      selectedSlideIndex: i
    });
  }
}

Main.defaultProps = {
  initialSlide: 0
};

export default Main;
