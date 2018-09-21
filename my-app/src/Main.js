import React, { Component } from "react";
import OverviewSection from "./OverviewSection.js";
import SlideViewer from "./SlideViewer.js";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSlideIndex: props.initialSlide
    };
    this.handleSlideChangeClick = this.handleSlideChangeClick.bind(this);
    this.findSlideIndexFromID = this.findSlideIndexFromID.bind(this);
  }
  render() {
    let selectedSlideIndex = this.state.selectedSlideIndex;
    return (
      <div className={"main " + this.props.layout}>
        <OverviewSection
          handleThumbClick={this.handleSlideChangeClick}
          slides={this.props.slides}
          selectedSlide={selectedSlideIndex}
        />
        <SlideViewer
          layout={this.props.layout}
          buttonOnClick={this.handleSlideChangeClick}
          slide={this.props.slides[selectedSlideIndex]}
        />
      </div>
    );
  }

  //Sets the next slide to display, and checks that its in range
  handleSlideChangeClick(nextSlide) {
    let slideIndex = -1;
    //confirm that nextSlide is an int
    if (
      typeof nextSlide === "number" &&
      nextSlide === parseInt(nextSlide, 10)
    ) {
      slideIndex = nextSlide;
    } else if (typeof nextSlide === "string") {
      slideIndex = this.findSlideIndexFromID(nextSlide);
    }

    //if sl
    if (slideIndex >= this.props.slides.length || slideIndex < 0) {
      return;
    }
    this.setState({
      selectedSlideIndex: slideIndex
    });

    // let slides = this.state.slides;
  }

  /**
   * Finds the corresponding index for the slide with the given ID
   * Returns -1 if none found
   * @slideID - unique string to identify slide
   */
  findSlideIndexFromID = function findSlideIndexFromID(slideID) {
    let index = -1;
    let slide = this.props.slides.find(slide => {
      return slide.id === slideID;
    });
    if (slide) {
      index = slide.index;
    }
    return index;
  };
}

Main.defaultProps = {
  initialSlide: 0
};

export default Main;
