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
        console.log("Parsing JSON");
        console.log(file);
        var fr = new FileReader();

        fr.onload = e => {
          var file = fr.result;
          console.log(fr.result);

          this.setState({ slides: JSON.parse(fr.result).slides });
        };

        fr.readAsText(file);
        break;

      case "nmf":
      case "zip":
        if (fileExtension === ".nmf") {
          fileName = file.name.replace("nmf", "zip");
        }
        console.log("zip file");

        //TODO Replace zipReader=> with function that takes zipreader as arg?`this` may be wrong
        window.zip.createReader(new window.zip.BlobReader(file), zipReader => {
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

          checkFilesReady(loadCounter, () => {
            this.showSlides(slides, slideContent);
            zipReader.close(() =>
              console.log("zipReader closed and webworkers destroyed")
            );
          });
        });
        break;

      default:
        console.log("unsupported file type");
    }
  };

  showSlides(slides, content) {
    console.log("Showing slides");
    let displayableSlides = getUpdatedDisplayableSlides(slides, content);

    if (displayableSlides) {
      this.setState((prevState, props) => {
        return {
          displayableSlides
        };
      });
    }
  }
} //END OF COMPONENT

//checks if new slides are ready... this may be able to go away
//maybe move these functions out to a separate file for validation?
const getUpdatedDisplayableSlides = function updateDisplayableSlides(
  slides,
  content
) {
  console.log("building display slides");
  if (!slides || !content) {
    return false;
  }
  let displayableSlides = [];
  let error = false;

  slides.map(slide => {
    let displayableSlide = Object.assign({}, slide);
    displayableSlide.source_path = URL.createObjectURL(
      content[slide.content_file_name]
    );
    // buildDisplayableSlide(
    //   slide,
    //   content[slide.content_file_name]
    // );
    if (!displayableSlide) {
      error = true;
    } else {
      displayableSlides.push(displayableSlide);
    }
  }, this);

  return error ? false : displayableSlides;
};

//For a filename that is already a URL, leaves it as is and lets it be rendered that way
//for Images, builds a URL for the corresponding "file" in the content object
const buildDisplayableSlide = function buildDisplayableSlide(slide, content) {
  if (!content) {
    return;
  }

  let newSlide = Object.assign({}, slide);

  newSlide.source_path = URL.createObjectURL(content);
  return newSlide;
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
