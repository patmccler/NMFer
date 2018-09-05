import React from "react";
import SlideDetail from "./SlideDetail.js";
import LargeView from "./LargeView.js";

//TODO: maybe use state here to manage updating with a new slide
// load before swapping to next to reduce lag

const SlideViewer = props => {
  let slide = props.slide;
  let largeViewProps = {
    type: slide.slide_type,
    slideIndex: slide.index,
    buttonOnClick: props.buttonOnClick,
    source: slide.source_path
  };

  //only include these props if they exist
  if (slide.next_slide) {
    largeViewProps.next_slide = slide.next_slide;
  }
  if (slide.prev_slide) {
    largeViewProps.prev_slide = slide.prev_slide;
  }

  return (
    <div className="slide-viewer">
      <SlideDetail slide={slide} />
      <LargeView {...largeViewProps} />
    </div>
  );
};

export default SlideViewer;
