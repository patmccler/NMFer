import React, { Component } from "react";

const SlideViewer = props => {
  let slide = props.slide;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "solid 2px darkgrey",
        flexBasis: "80%",
        justifyContent: "space-between"
      }}
    >
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
        <li key={prop} style={{ textAlign: "left" }}>
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
    <div style={{ flexBasis: "15%" }}>
      <h3>Slide Details for slide {props.slideNumber}</h3> <br />
      <ul>{slideDetailsToDisplay}</ul>
    </div>
  );
};

const ImageView = props => {
  return (
    <div
      style={{
        borderWidth: 2,
        borderColor: "solid",
        borderStyle: "darkgrey",
        display: "flex",
        flexBasis: "75%",
        padding: "20 0"
      }}
      className="image-viewer"
    >
      <button
        onClick={() => props.onClick(props.slideNumber - 2)}
        style={{ flexBasis: "5%" }}
      >
        {"<"}
      </button>
      <img style={{ flexBasis: "90%" }} src={props.image} />
      <button
        onClick={() => props.onClick(props.slideNumber)}
        style={{ flexBasis: "5%" }}
      >
        >
      </button>
    </div>
  );
};

export default SlideViewer;
