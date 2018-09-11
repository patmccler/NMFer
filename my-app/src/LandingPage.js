import React from "react";

var FilePicker = props => {
  return (
    <div className="file-picker">
      <input ref={props.filePickerRef} type="file" />
      <button onClick={props.handleFileClick}>Select File</button>
    </div>
  );
};

var ProgressBar = props => {
  let progress = props.progressPercent;
  return (
    <div className="progress-bar-holder">
      <div>{`${props.filesLoaded} of ${props.totalFiles} loaded`}</div>
    </div>
  );
};

var LandingPage = props => {
  return (
    <div className="landing-page">
      {props.totalFiles < 0 ? (
        <FilePicker {...props} />
      ) : (
        <ProgressBar {...props} />
      )}
    </div>
  );
};

export default LandingPage;
