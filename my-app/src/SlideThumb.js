import React from "react";

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

export default SlideThumb;
