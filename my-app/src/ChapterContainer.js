import React, { Component } from "react";
import Chapter from "./Chapter.js";

//takes a list of all slides and returns the appropriate chapters to display
class ChapterContainer extends Component {
  constructor(props) {
    super(props);

    let chapterHideState = props.chapters.map(chapter => true);

    this.state = {
      chapterHideState: chapterHideState
    };

    this.handleChapterTitleClick = this.handleChapterTitleClick.bind(this);
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
    console.log(this.state);
    return (
      <div className="chapterContainer">
        {this.props.chapters.map((chapter, index) => (
          <Chapter
            selectedSlide={this.props.selectedSlide}
            isHidden={this.state.chapterHideState[index]}
            slides={chapter.slides}
            title={chapter.title}
            handleThumbClick={this.props.handleThumbClick}
            onChapterTitleClick={() => this.handleChapterTitleClick(index)}
          />
        ))}
      </div>
    );
  }
}

export default ChapterContainer;
