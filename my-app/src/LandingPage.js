import React, { Component } from "react";
import OverviewSection from "./OverviewSection";

//TODO Style this better
var FilePicker = props => {
  return (
    // <input ref={props.filePickerRef} type="file" />
    //<button onClick={props.handleFileClick}>Select File</button>

    <div className="slide-viewer file-picker">
      <input
        onChange={props.onFileChange}
        ref={props.filePickerRef}
        type="file"
        name="file"
        id="file"
        className="inputfile"
      />
      <label htmlFor="file">
        {props.chosenFile ? props.chosenFile : "Choose an NMF"}
      </label>
      <button
        className={"loadButton" + (props.chosenFile ? "" : " hide")}
        onClick={props.handleFileClick}
      >
        Load!
      </button>
    </div>
  );
};

var ProgressBar = props => {
  return (
    <div className="slide-viewer progress-section">
      <div className="loaded-files-label">
        {`${props.filesLoaded} of ${props.totalFiles} loaded`}
      </div>
      <div className="progress-bar-total">
        <div
          style={{
            width:
              Math.floor((props.filesLoaded / props.totalFiles) * 100) + "%"
          }}
          className="progress-bar-percent"
        />
      </div>
    </div>
  );
};

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.filePickerChanged = this.filePickerChanged.bind(this);
    this.state = { chosenFile: null };
  }

  filePickerChanged() {
    let file = this.props.filePickerRef.current.files[0];
    let fileName = file ? file.name : null;

    this.setState({
      chosenFile: fileName
    });
  }

  render() {
    return this.props.totalFiles < 0 ? (
      <div className="main landing-page">
        <OverviewSection />
        <FilePicker
          chosenFile={this.state.chosenFile}
          onFileChange={this.filePickerChanged}
          {...this.props}
        />
      </div>
    ) : (
      <div className="main landing-page">
        <OverviewSection />
        <ProgressBar {...this.props} />
      </div>
    );
  }
}

export default LandingPage;
