import React, { Component } from "react";
import Main from "./Main.js";
import LandingPage from "./LandingPage.js";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayableSlides: null,
      filesLoaded: 0,
      totalFiles: -1
    };

    this.filePicker = React.createRef();

    this.getFile = this.getFile.bind(this);
    this.unpackFile = this.unpackFile.bind(this);
    this.readZipReaderContents = this.readZipReaderContents.bind(this);
    this.checkFilesReady = this.checkFilesReady.bind(this);
  }

  render() {
    return this.state.displayableSlides ? (
      <Main {...this.props} slides={this.state.displayableSlides} />
    ) : (
      <LandingPage
        filePickerRef={this.filePicker}
        handleFileClick={this.getFile}
        filesLoaded={this.state.filesLoaded}
        totalFiles={this.state.totalFiles}
      />
    );
  }

  getFile = function getFile() {
    var files = this.filePicker.current.files;

    if (files[0]) {
      let fileName = files[0].name;
      this.unpackFile(files[0], fileName);
      //
    }
  };

  unpackFile = (file, fileName) => {
    let fileExtension = /(?:\.([^.]+))?$/.exec(fileName)[1].toLowerCase();

    switch (fileExtension) {
      case "json":
        readJSONOnlyFile(file, result => {
          this.showSlides(result.slides);
        });
        break;

      case "nmf":
      case "zip":
        if (fileExtension === ".nmf") {
          fileName = file.name.replace("nmf", "zip");
        }
        console.log("zip file");

        window.zip.createReader(
          new window.zip.BlobReader(file),
          this.readZipReaderContents
        );
        break;

      default:
        console.log("unsupported file type");
    }
  };
  //This could still probably be broken up more, but "this" makes it awkward...
  readZipReaderContents(zipReader) {
    let loadCounter = {
      filesLoaded: 0,
      totalFiles: -1
    };
    let slideContent = {};
    let slides;

    zipReader.getEntries(entries => {
      loadCounter.totalFiles = entries.length;

      entries.forEach(entry => {
        let fileName = entry.filename;

        if (fileName === "manifest.json") {
          entry.getData(new window.zip.TextWriter(), file => {
            loadCounter.filesLoaded++;
            slides = JSON.parse(file).slides;
          });
        } else if (/^content\/./i.test(fileName)) {
          //file was in content folder
          entry.getData(new window.zip.BlobWriter(), file => {
            loadCounter.filesLoaded++;
            slideContent[fileName] = file;
          });
        } else {
          //dont need to read the files we aren't interested in
          loadCounter.filesLoaded++;
        }
      }); //end foreach entry
    }); //end getEntries

    this.checkFilesReady(loadCounter, () => {
      this.showSlides(slides, slideContent);
      zipReader.close(() =>
        console.log("zipReader closed and webworkers destroyed")
      );
    });
  }

  checkFilesReady(counter, callBack) {
    if (this.state.totalFiles === -1) {
      this.setState({ totalFiles: counter.totalFiles });
    }
    if (this.state.filesLoaded !== counter.filesLoaded) {
      this.setState({ filesLoaded: counter.filesLoaded });
    }

    if (counter.filesLoaded === counter.totalFiles) {
      callBack();
    } else {
      setTimeout(this.checkFilesReady, 500, counter, callBack);
    }
  }

  showSlides(slides, content) {
    //TODO good place to validate slides eventually.
    console.log("Showing slides");
    this.setState({
      displayableSlides: buildSlides(slides, content)
    });
  }
} //END OF COMPONENT

const readJSONOnlyFile = function readFile(file, successCallBack) {
  console.log("Parsing JSON");
  var fr = new FileReader();

  fr.onload = e => {
    successCallBack(JSON.parse(fr.result));
  };

  fr.readAsText(file);
};

/**
 * Builds array of slides with the correct format to display later
 * @param {array} slides - slides which need to use the content
 * @param {array} content - array of blobs from zip file
 */
const buildSlides = function buildSlides(slides, content) {
  if (!slides) {
    return false;
  }

  //for the new "simple" nmf with urls as content
  if (!content) {
    return slides.map(slide => {
      slide.source_path = slide.content_file_name;
      return slide;
    });
  }
  //for a more typical NMF where files are pointed at by content_file_name
  let displayableSlides = slides.map(slide => {
    let displayableSlide = Object.assign({}, slide);
    try {
      displayableSlide.source_path = URL.createObjectURL(
        content[slide.content_file_name]
      );
    } catch (e) {
      displayableSlide.source_path = "oops";
      console.log("ISSUE: " + slide.content_file_name);
    }
    return displayableSlide;
  });

  return displayableSlides;
};

export default MainContainer;
