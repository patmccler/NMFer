import React, { Component } from "react";
import OverviewSection from "./OverviewSection.js";
import SlideViewer from "./SlideViewer.js";

class Main extends Component {
  constructor(props) {
    super(props);
    let selectedSlide = props.slides ? props.slides[props.initialSlide] : null;
    this.state = {
      selectedSlide: selectedSlide,
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

export default Main;
