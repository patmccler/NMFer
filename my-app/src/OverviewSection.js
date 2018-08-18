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
          content={props.content[slide.content_file_name]}
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
  let source = props.slide.content_file_name;
  if (source.includes("content/")) {
    console.log(props.content);
    let image = new Blob([props.content], { type: "image/jpeg" });
    source = URL.createObjectURL(image);
  }
  //let contentSource = props.content[source];
  return (
    <img
      onClick={props.onClick}
      className={
        "overview-slide-thumb" +
        (props.selected ? " overview-slide-thumb-highlight" : "")
      }
      src={source}
    />
  );
};

export default OverviewSection;
