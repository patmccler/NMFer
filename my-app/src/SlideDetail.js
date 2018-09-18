import React from "react";

//TODO - will need a callback to update slides here eventuall
//if we want to make this an editor as well
const SlideDetail = props => {
  let slideDetailsToDisplay = [];

  if (props) {
    for (let prop in props) {
      slideDetailsToDisplay.push(
        <li key={prop} className="slide-detail-item">
          <label>{prop + ": "}</label>
          <input readOnly type="text" value={JSON.stringify(props[prop])} />
        </li>
      );
    }
  } else {
    slideDetailsToDisplay = [<li>No Slide Info </li>];
  }
  return (
    <div className="slide-viewer-detail">
      <div className="slide-viewer-detail-header">
        Slide Details for slide {props.index + 1} <br />
      </div>
      <div className="slide-detail-items">
        <RequiredFields {...props} />
        <VideoFields {...props} />
        <OptionalFields {...props} />
        <LinkFields {...props} />
      </div>
    </div>
  );
};

export default SlideDetail;

const RequiredFields = props => {
  return (
    <div className="slide-detail-section required-fields">
      <SlideDetailItem label="File Name:" value={props.content_file_name} />
      <SlideDetailItem label="Slide Type:" value={props.slide_type} />
    </div>
  );
};

//Eventually will only want to show these if they are used,
//and when adding new fields give a list of possible options
const OptionalFields = props => {
  return (
    <div className="slide-detail-section optional-fields">
      <SlideDetailItem label="Slide ID: " value={props.id} />
      <SlideDetailItem label="Next Slide:" value={props.next_slide} />
      <SlideDetailItem label="Previous Slide:" value={props.prev_slide} />
      <SlideDetailItem label="Transition: " value={props.next_transition} />
    </div>
  );
};

const VideoFields = props => {
  return props.slide_type === "video" ? (
    <div className="slide-detail-section video-fields">
      <SlideDetailItem label="Repeats?: " value={props.repeats} />
      <SlideDetailItem
        label="Repeats from: "
        value={props.repeat_from_seconds}
      />
    </div>
  ) : null;
};

const LinkFields = props => {
  return props.links ? (
    <div className="slide-detail-section link-fields">
      {props.links.map(link => (
        <Link {...link} />
      ))}
    </div>
  ) : null;
};

//todo update once I have a better understanding
//labels could be more descriptive
//maybe do mouseover with better info
const Link = props => {
  return (
    <div class="detail-link">
      <SlideDetailItem label="Link to Slide: " value={props.link_to_id} />
      <SlideDetailItem label="X value: " value={props.x} />
      <SlideDetailItem label="Y value: " value={props.y} />
      <SlideDetailItem label="Width : " value={props.width} />
      <SlideDetailItem label="height: " value={props.width} />
    </div>
  );
};

//default way to display an option and its value
//not the best look but this is probably how to organize it
const SlideDetailItem = props => {
  return (
    <div className="slide-detail-item">
      <label>{props.label} </label>
      <input
        readOnly
        type="text"
        value={props.value ? JSON.stringify(props.value) : "Unset/Default"}
      />
    </div>
  );
};
