import React, { Component } from "react";

//TODO: Put slide detail after image view for tall view, need to get that from props somehow
const SlideViewer = props => {
  let slide = props.slide;

  return (
    <div className="slide-viewer">
      <SlideDetail slideNumber={props.slideNumber} slide={slide} />
      <LargeView
        type={slide.slide_type}
        slideNumber={props.slideNumber}
        onClick={props.onClick}
        source={slide.source_path}
      />
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

const LargeView = props => {
  return (
    <div className="image-viewer">
      <button
        onClick={() => props.onClick(props.slideNumber - 2)}
        className="image-viewer-side-button"
      >
        {"<"}
      </button>

      {props.type == "image" ? (
        <ImageView source={props.source} />
      ) : (
        <VideoView source={props.source} />
      )}
      <button
        onClick={() => props.onClick(props.slideNumber)}
        className="image-viewer-side-button"
      >
        {">"}
      </button>
    </div>
  );
};

//TODO remove wrapper div - should center OK
const VideoView = props => {
  return (
    <div className="video-wrapper">
      <div className="image-viewer-3-by-4">
        <video autoPlay className="image-viewer-large-video" src={props.source}>
          Failed to load{" "}
        </video>
      </div>
    </div>
  );
};

const ImageView = props => {
  return (
    <div className="image-wrapper">
      <div
        className="image-viewer-large-image image-viewer-3-by-4"
        style={{ backgroundImage: `url(${props.source})` }}
      />
    </div>
  );
};

// //className="image-viewer-large-image"
// src={props.image}
// alt="MainImage"

export default SlideViewer;
