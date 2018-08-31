import React from "react";

const SlideThumb = props => {
  let elementToReturn;
  let ref;
  if (props.selectedSlideRef) {
    ref = props.selectedSlideRef;
  }

  switch (props.slide.slide_type) {
    case "image":
      let imgProps = buildImageProps(props);
      if (ref) imgProps.ref = ref;
      elementToReturn = <img {...imgProps} />;

      break;
    case "video":
      let vidProps = buildVideoProps(props);
      if (ref) vidProps.ref = ref;
      elementToReturn = <video {...vidProps}>Failed to load </video>;
      break;

    default:
      elementToReturn = <div>UNSUPPORTED SLIDE TYPE</div>;
  }

  return elementToReturn;
};

const buildImageProps = props => {
  let className =
    "overview-slide-thumb" +
    (props.selected ? " overview-slide-thumb-highlight" : "");

  let imgProps = {
    onClick: props.onClick,
    className,
    src: props.slide.source_path
  };

  return imgProps;
};

const buildVideoProps = props => {
  let className =
    "overview-slide-thumb overview-slide-video" +
    (props.selected ? " overview-slide-thumb-highlight" : "");

  let vidProps = {
    muted: true,
    onClick: props.onClick,
    className,
    src: props.slide.source_path
  };
  return vidProps;
};

export default SlideThumb;
