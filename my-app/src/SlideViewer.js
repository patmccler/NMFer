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
      <h3>Slide Details for slide {props.slideNumber}</h3> <br />
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
      <img style={{ flexBasis: "90%" }} src={props.image} />
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
