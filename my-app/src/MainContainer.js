import React, { Component } from "react";
import Main from "./Main.js";
import LandingPage from "./LandingPage.js";

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayableSlides: null
    };

    this.filePicker = React.createRef();

    this.unpackFile = this.unpackFile.bind(this);
    this.getFile = this.getFile.bind(this);
    this.readZipReaderContents = this.readZipReaderContents.bind(this);
  }

  render() {
    return this.state.displayableSlides ? (
      <Main {...this.props} slides={this.state.displayableSlides} />
    ) : (
      <LandingPage filePickerRef={this.filePicker} onClick={this.getFile} />
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

  //TODO Separate these out to individual functions
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

        //TODO Replace zipReader=> with function that takes zipreader as arg?`this` may be wrong
        console.log(this);
        window.zip.createReader(
          new window.zip.BlobReader(file),
          this.readZipReaderContents
        );
        // /
        break;

      default:
        console.log("unsupported file type");
    }
  };
  readZipReaderContents(zipReader) {
    let loadCounter = {
      filesLoaded: 0,
      totalFiles: -1
    };
    let totalFilesLoaded = 0;
    let slideContent = {};
    let slides;

    zipReader.getEntries(entries => {
      loadCounter.totalFiles = entries.length;
      entries.map(entry => {
        let fileName = entry.filename;

        if (fileName.includes("manifest.json")) {
          entry.getData(new window.zip.TextWriter(), file => {
            loadCounter.filesLoaded++;
            slides = JSON.parse(file).slides;
          });
        } else if (/^content\/./i.test(fileName)) {
          entry.getData(new window.zip.BlobWriter(), file => {
            loadCounter.filesLoaded++;
            slideContent[fileName] = file;
          });
        } else {
          //dont need to read the files we aren't interested in
          loadCounter.filesLoaded++;
        }
      });
    });
    console.log(this);
    checkFilesReady(loadCounter, () => {
      this.showSlides(slides, slideContent);
      zipReader.close(() =>
        console.log("zipReader closed and webworkers destroyed")
      );
    });
  }

  showSlides(slides, content) {
    console.log("Showing slides");
    let displayableSlides = buildDisplayableSlides(slides, content);

    if (displayableSlides) {
      this.setState((prevState, props) => {
        return {
          displayableSlides
        };
      });
    }
  }
} //END OF COMPONENT

const readJSONOnlyFile = function readFile(file, successCallBack) {
  console.log("Parsing JSON");
  var fr = new FileReader();

  fr.onload = e => {
    var file = fr.result;
    successCallBack(JSON.parse(fr.result));
  };

  fr.readAsText(file);
};

/**
 * Builds array of slides with the correct format to display later
 * @param {array} slides - slides which need to use the content
 * @param {array} content - array of blobs from zip file
 */
const buildDisplayableSlides = function buildDisplayableSlides(
  slides,
  content
) {
  console.log("building display slides");
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
    let slideContent = content[slide.content_file_name];
    let displayableSlide = Object.assign({}, slide);
    displayableSlide.source_path = URL.createObjectURL(
      content[slide.content_file_name]
    );
    return displayableSlide;
  });

  return displayableSlides;
};

function checkFilesReady(counter, callBack) {
  console.log(
    `filesReady: ${counter.filesLoaded}, totalFiles: ${counter.totalFiles}`
  );
  if (counter.filesLoaded === counter.totalFiles) {
    callBack();
  } else {
    setTimeout(checkFilesReady, 500, counter, callBack);
  }
}

export default MainContainer;
