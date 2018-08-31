import React, { Component } from "react";
import Chapter from "./Chapter.js";

//takes a list of all slides and returns the appropriate chapters to display
class ChapterContainer extends Component {
  constructor(props) {
    super(props);
    let chapterHideState = props.chapters.map(
      (chapter, index) =>
        index === props.chapterWithSelectedSlide ? false : true
    );
    this.activeSlide = React.createRef();

    this.scrollActiveSlide = () => {
      if (this.activeSlide.current && !checkVisible(this.activeSlide.current))
        this.activeSlide.current.scrollIntoView({ behavior: "smooth" });
    };

    this.state = {
      chapterHideState: chapterHideState
    };
    this.handleChapterTitleClick = this.handleChapterTitleClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.chapterWithSelectedSlide != this.props.chapterWithSelectedSlide
    ) {
      this.setState((prevState, props) => {
        let chapterHideState = prevState.chapterHideState;
        chapterHideState[prevProps.chapterWithSelectedSlide] = true;
        chapterHideState[props.chapterWithSelectedSlide] = false;
        return chapterHideState;
      });
    }

    if (prevProps.selectedSlide != this.props.selectedSlide) {
      console.log("New selected Slide");
      this.forceUpdate(this.scrollActiveSlide);
    }
  }

  handleChapterTitleClick(i) {
    console.log("Toggling Chapter " + (i + 1) + " hidden");
    this.setState((prevState, props) => {
      let newChapterHideState = prevState.chapterHideState;
      newChapterHideState[i] = !newChapterHideState[i];
      return newChapterHideState;
    });
  }

  render() {
    return (
      <div className="chapterContainer">
        {this.props.chapters.map((chapter, index) => (
          <Chapter
            selectedSlideRef={this.activeSlide}
            selectedSlide={this.props.selectedSlide}
            isHidden={this.state.chapterHideState[index]}
            slides={chapter.slides}
            title={chapter.title}
            key={index}
            handleThumbClick={this.props.handleThumbClick}
            onChapterTitleClick={() => this.handleChapterTitleClick(index)}
          />
        ))}
      </div>
    );
  }
}

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );

  return !(rect.bottom > viewHeight || rect.top <= 0);
}

export default ChapterContainer;
