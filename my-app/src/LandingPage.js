import React from "react";
import OverviewSection from "./OverviewSection";

//TODO Style this better
var FilePicker = props => {
  return (
    <div className="slide-viewer file-picker">
      <input ref={props.filePickerRef} type="file" />
      <button onClick={props.handleFileClick}>Select File</button>
    </div>
  );
};

var ProgressBar = props => {
  let progress = props.progressPercent;
  return (
    <div className="slide-viewer progress-bar-holder">
      <div>{`${props.filesLoaded} of ${props.totalFiles} loaded`}</div>
    </div>
  );
};

var LandingPage = props => {
  return props.totalFiles < 0 ? (
    <div className="main landing-page">
      <OverviewSection />
      <FilePicker {...props} />
    </div>
  ) : (
    <div className="main landing-page">
      <OverviewSection />
      <ProgressBar {...props} />
    </div>
  );
};

export default LandingPage;
