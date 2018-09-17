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
      <ul>{slideDetailsToDisplay}</ul>
    </div>
  );
};

export default SlideDetail;
