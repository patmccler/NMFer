import React, { Component } from "react";
import Main from "./Main.js";

var FilePicker = props => {
  return (
    <div>
      <input type="file" id="input-file" />
      <button onClick={props.onClick}>Select File</button>
    </div>
  );
};

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayableSlides: null
    };
    this.unpackFile = this.unpackFile.bind(this);
    this.getFile = this.getFile.bind(this);
  }

  render() {
    return this.state.displayableSlides ? (
      <Main {...this.props} slides={this.state.displayableSlides} />
    ) : (
      <FilePicker onClick={this.getFile} />
    );
  }

  getFile = function getFile() {
    var files = document.getElementById("input-file").files;

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

        window.zip.createReader(new window.zip.BlobReader(file), zipReader => {
          let totalFilesLoaded = 0;
          let slideContent = {};
          let slides;
          zipReader.getEntries(entries => {
            entries.map(entry => {
              let fileName = entry.filename;
              if (fileName.includes("__") || fileName.includes("/.")) return; //zip seems to include __MACOX/each file .. dunno

              if (fileName.includes("manifest.json")) {
                entry.getData(new window.zip.TextWriter(), file => {
                  slides = JSON.parse(file).slides;
                });
              } else if (/content\/./i.test(fileName)) {
                entry.getData(new window.zip.BlobWriter(), file => {
                  totalFilesLoaded += 1;
                  slideContent[fileName] = file;
                  console.log(slideContent);
                  console.log(totalFilesLoaded);

                  if (slides && slides.length == totalFilesLoaded) {
                    this.showSlides(slides, slideContent);
                  }
                });
              }
            });
          });

          console.log(zipReader);
        });
        break;

      default:
        console.log("unsupported file type");
    }
  };

  showSlides(slides, content) {
    let displayableSlides = this.getUpdatedDisplayableSlides(slides, content);

    if (displayableSlides) {
      this.setState((prevState, props) => {
        return {
          displayableSlides
        };
      });
    }
  }

  getUpdatedDisplayableSlides = function updateDisplaySlides(slides, content) {
    if (!slides || !content) {
      return false;
    }

    console.log("Updating display slides");

    let displayableSlides = [];
    let error = false;

    slides.map(slide => {
      console.log(slide);
      console.log(content);
      let displayableSlide = this.buildDisplayableSlide(
        slide,
        content[slide.content_file_name]
      );
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
  //video is wip
  buildDisplayableSlide = function buildDisplayableSlide(slide, content) {
    if (!content) {
      return;
    }

    let newSlide = Object.assign({}, slide);

    switch (slide.slide_type) {
      //ASSUMES JPG FOR NOW
      //NEED TO CHECK TYPE OF IMAGE HERE EVENTUALLY
      case "image":
        if (newSlide.content_file_name.includes("content/")) {
          let image = new Blob([content], { type: "image/jpeg" });
          newSlide.source_path = URL.createObjectURL(image);
        }
        break;
      case "video":
        if (newSlide.content_file_name.includes("content/")) {
          console.log(content);
          let video = content; //new Blob([content], { type: "video/mp4" });
          newSlide.source_path = URL.createObjectURL(video);
        }
        break;

      default:
        console.log(
          "unsupported slide type for slide" + slide.content_file_name
        );
    }
    return newSlide;
  };
}
export default MainContainer;
