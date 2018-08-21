import React, { Component } from "react";

const OverviewSection = props => {
  var slidesToDisplay = [];
  if (props.slides) {
    console.log(props);
    props.slides.map((slide, index) => {
      slidesToDisplay.push(
        <SlideThumb
          selected={props.selectedSlide === index ? true : false}
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
    <div className="overview-section">
      {slidesToDisplay.map((slide, i) => slide)}
    </div>
  );
};
//style={{ width: props.width }}f

const SlideThumb = props => {
  let elementToReturn;

  switch (props.slide.slide_type) {
    case "image":
      elementToReturn = (
        <img
          onClick={props.onClick}
          className={
            "overview-slide-thumb" +
            (props.selected ? " overview-slide-thumb-highlight" : "")
          }
          src={props.slide.source_path}
        />
      );

      break;
    case "video":
      elementToReturn = (
        <video
          muted
          autoplay
          controls
          playsinline
          onClick={props.onClick}
          className={
            "overview-slide-thumb overview-slide-video" +
            (props.selected ? " overview-slide-thumb-highlight" : "")
          }
          src={props.slide.source_path}
        >
          Failed to load{" "}
        </video>
      );
      break;

    default:
      elementToReturn = <div>UNSUPPORTED SLIDE TYPE</div>;
  }

  return elementToReturn;
};

export default OverviewSection;
