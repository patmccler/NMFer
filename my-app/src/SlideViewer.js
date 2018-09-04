import React from "react";
import SlideDetail from "./SlideDetail.js";
import LargeView from "./LargeView.js";

//TODO: maybe use state here to manage updating with a new slide
// load before swapping to next to reduce lag

const SlideViewer = props => {
  let slide = props.slide;

  return (
    <div className="slide-viewer">
      <SlideDetail slideIndex={props.slideIndex} slide={slide} />
      <LargeView
        type={slide.slide_type}
        slideIndex={props.slideIndex}
        buttonOnClick={props.buttonOnClick}
        source={slide.source_path}
      />
    </div>
  );
};

export default SlideViewer;
