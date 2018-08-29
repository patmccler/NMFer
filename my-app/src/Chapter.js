import React, { Component } from "react";
import SlideThumb from "./SlideThumb.js";

const Chapter = props => {
  console.log(props);
  let slidesToDisplay = [];

  if (props.slides) {
    props.slides.map(slide => {
      let index = slide.index;
      slidesToDisplay.push(
        <SlideThumb
          selected={props.selectedSlide === index ? true : false}
          index={index}
          slide={slide}
          onClick={() => props.handleThumbClick(index)}
          key={index}
        />
      );
    });
  } else {
    slidesToDisplay = [<span key="default">NO SLIDES FOUND</span>];
  }

  return (
    <div className="chapter">
      <ChapterTitle onClick={props.onChapterTitleClick} title={props.title} />
      {slidesToDisplay.map((slide, i) => slide)}
    </div>
  );
};

const ChapterTitle = props => {
  return (
    <button onClick={props.onClick} className="chapter-title">
      {props.title}
    </button>
  );
};

export default Chapter;
