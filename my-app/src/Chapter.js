import React, { Component } from "react";
import SlideThumb from "./SlideThumb.js";

const Chapter = props => {
  let slidesToDisplay = [];

  if (props.slides) {
    //TODO use separate renderslide method
    props.slides.map(slide => {
      let index = slide.index;
      let selected = props.selectedSlide === index;

      let theseProps = {
        selected,
        index,
        slide,
        onClick: () => props.handleThumbClick(index)
      };
      if (selected) {
        theseProps.selectedSlideRef = props.selectedSlideRef;
      }

      slidesToDisplay.push(<SlideThumb {...theseProps} key={index} />);
    });
  } else {
    slidesToDisplay = [<span key="default">NO SLIDES FOUND</span>];
  }

  return (
    <div className={"chapter" + (props.isHidden ? " hidden" : "")}>
      <ChapterTitle onClick={props.onChapterTitleClick} title={props.title} />
      <div className="chapter-body">
        {slidesToDisplay.map((slide, i) => slide)}
      </div>
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
