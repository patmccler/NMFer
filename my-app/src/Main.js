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
    this.handleSlideChangeClick = this.handleSlideChangeClick.bind(this);
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
          handleThumbClick={this.handleSlideChangeClick}
          slides={this.props.slides}
          selectedSlide={selectedSlideIndex}
        />
        <SlideViewer
          layout={this.props.layout}
          buttonOnClick={this.handleSlideChangeClick}
          slideIndex={selectedSlideIndex}
          slide={this.props.slides[selectedSlideIndex]}
        />
      </div>
    );
  }

  //Sets the next slide to display, and checks that its in range
  handleSlideChangeClick(i) {
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
