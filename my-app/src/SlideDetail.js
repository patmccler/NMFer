import React from "react";

//TODO - will need a callback to update slides here eventuall
//if we want to make this an editor as well
const SlideDetail = props => {
  let slideDetailsToDisplay = [];

  return (
    <div
      className={`slide-viewer-detail${
        props.minimized ? " minimized" : " maximized"
      }`}
    >
      <button onClick={props.handleToggle} className="slide-detail-header">
        Slide Details{" "}
        <span className="detail-hidable">for slide {props.index + 1}</span>
      </button>
      <div className="slide-detail-items detail-hidable">
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
      <div className="slide-detail-header">Required Fields:</div>
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
      <div className="slide-detail-header">Optional Fields:</div>
      {props.chapter_title ? (
        <SlideDetailItem label="Chapter Title: " value={props.chapter_title} />
      ) : null}
      <SlideDetailItem label="Slide ID: " value={props.id} />
      <SlideDetailItem label="Next Slide:" value={props.next_slide} />
      {props.next_slide ? (
        <ChangeSlideButton
          nextSlide={props.next_slide}
          requestSlideChange={props.requestSlideChange}
        />
      ) : null}
      <SlideDetailItem label="Previous Slide:" value={props.prev_slide} />
      {props.prev_slide ? (
        <ChangeSlideButton
          nextSlide={props.prev_slide}
          requestSlideChange={props.requestSlideChange}
        />
      ) : null}
      <SlideDetailItem label="Transition: " value={props.next_transition} />
    </div>
  );
};

const VideoFields = props => {
  return props.slide_type === "video" ? (
    <div className="slide-detail-section video-fields">
      <div className="slide-detail-header">Video Fields:</div>
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
      <div className="slide-detail-header">Link Fields:</div>
      {props.links.map(link => (
        <Link
          key={link.link_to_id + link.x}
          requestSlideChange={props.requestSlideChange}
          {...link}
        />
      ))}
    </div>
  ) : null;
};

//todo update once I have a better understanding
//labels could be more descriptive
//maybe do mouseover with better info
// <button onClick={() => props.handleLinkClick(props.link_to_id)}>
// Go To Slide
// </button>
const Link = props => {
  return (
    <div className="detail-link">
      <SlideDetailItem label="Link to Slide: " value={props.link_to_id} />
      <ChangeSlideButton
        nextSlide={props.link_to_id}
        requestSlideChange={props.requestSlideChange}
      />
      <SlideDetailItem label="X value: " value={props.x} />
      <SlideDetailItem label="Y value: " value={props.y} />
      <SlideDetailItem label="Width : " value={props.width} />
      <SlideDetailItem label="height: " value={props.width} />
    </div>
  );
};

const ChangeSlideButton = props => {
  return (
    <button
      className="change-slide-button"
      onClick={() => props.requestSlideChange(props.nextSlide)}
    >
      Go To Slide
    </button>
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
        value={props.value ? props.value : "Unset/Default"}
      />
    </div>
  );
};
