import React from "react";

var FilePicker = props => {
  return (
    <div>
      <input ref={props.filePickerRef} type="file" id="input-file" />
      <button onClick={props.handleFileClick}>Select File</button>
    </div>
  );
};

var ProgressBar = props => {
  let progress = props.progressPercent;

  <div className="progress-bar-holder">
    <div width={(progress = "%")} className="progress-bar" />
  </div>;
};

var LandingPage = props => {
  return <FilePicker {...props} />;
};

export default LandingPage;
