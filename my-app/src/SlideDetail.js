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
        <SlideRequiredFields {...props} />
        <SlideVideoOptions {...props} />
        <SlideOptionalFields {...props} />
        <div className="slide-detail-section">
          <SlideDetailItem label="TEST 1" value="test 1" />
        </div>
      </div>
    </div>
  );
};

export default SlideDetail;

const SlideOptionalFields = props => {
  return (
    <div className="slide-detail-section optional-fields">
      <SlideDetailItem label="Next Slide:" value={props.next_slide} />
      <SlideDetailItem label="Previous Slide:" value={props.prev_slide} />
    </div>
  );
};

const SlideVideoOptions = props => {
  return props.slide_type === "video" ? (
    <div className="slide-detail-section video options">
      <SlideDetailItem label="Repeats?: " value={props.repeats} />
      <SlideDetailItem
        label="Repeats from: "
        value={props.repeat_from_seconds}
      />
    </div>
  ) : null;
};

const SlideRequiredFields = props => {
  return (
    <div className="slide-detail-section required-fields">
      <SlideDetailItem label="File Name:" value={props.content_file_name} />
      <SlideDetailItem label="Slide Type:" value={props.slide_type} />
    </div>
  );
};

const SlideDetailItem = props => {
  return (
    <div className="slide-detail-item">
      <label>{props.label} </label>
      <input
        readOnly
        type="text"
        value={props.value ? JSON.stringify(props.value) : "Unset"}
      />
    </div>
  );
};
