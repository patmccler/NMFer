import React, { Component } from "react";

const OverviewSection = props => {
  var slidesToDisplay = [];
  if (props.slides) {
    props.slides.map((slide, index) => {
      slidesToDisplay.push(
        <SlideThumb
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
    <div
      style={{
        borderWidth: 2,
        borderColor: "darkgrey",
        borderStyle: "solid",
        padding: 3,
        flexBasis: "20%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "blue"
      }}
      className="overview-section"
    >
      {slidesToDisplay.map((slide, i) => slide)}
    </div>
  );
};

const SlideThumb = props => {
  return (
    <img
      onClick={props.onClick}
      style={{ width: "100%", height: 120, paddingBottom: 3 }}
      src={props.slide.content_file_name}
    />
  );
};

export default OverviewSection;
