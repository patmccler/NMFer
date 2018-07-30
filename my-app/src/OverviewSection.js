import React, { Component } from "react";

const OverviewSection = props => {
  var slidesToDisplay = [];
  if (props.slides) {
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

const SlideThumb = props => {
  return (
    <img
      onClick={props.onClick}
      className={
        "overview-slide-thumb" +
        (props.selected ? " overview-slide-thumb-highlight" : "")
      }
      src={props.slide.content_file_name}
    />
  );
};

export default OverviewSection;
