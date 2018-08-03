import React, { Component } from "react";

const SlideViewer = props => {
  let slide = props.slide;
  return (
    <div className="slide-viewer">
      <ImageView
        slideNumber={props.slideNumber}
        onClick={props.onClick}
        image={slide.content_file_name}
      />
      <SlideDetail slideNumber={props.slideNumber} slide={slide} />
    </div>
  );
};

const SlideDetail = props => {
  let slideDetailsToDisplay = [];

  if (props.slide) {
    for (let prop in props.slide) {
      slideDetailsToDisplay.push(
        <li key={prop} className="slide-detail-item">
          <label>{prop + ": "}</label>
          <input
            readOnly
            type="text"
            value={JSON.stringify(props.slide[prop])}
          />
        </li>
      );
    }
  } else {
    slideDetailsToDisplay = [<li>No Slide Info </li>];
  }
  return (
    <div className="slide-viewer-detail">
      <div className="slide-viewer-detail-header">
        Slide Details for slide {props.slideNumber} <br />
      </div>
      <ul>{slideDetailsToDisplay}</ul>
    </div>
  );
};

const ImageView = props => {
  return (
    <div className="image-viewer">
      <button
        onClick={() => props.onClick(props.slideNumber - 2)}
        className="image-viewer-side-button"
      >
        {"<"}
      </button>
      <img
        className="image-viewer-large-image"
        src={props.image}
        alt="MainImage"
      />
      <button
        onClick={() => props.onClick(props.slideNumber)}
        className="image-viewer-side-button"
      >
        {">"}
      </button>
    </div>
  );
};

export default SlideViewer;
