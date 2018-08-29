import React, { Component } from "react";
import Chapter from "./Chapter.js";

//takes a list of all slides and returns the appropriate chapters to display
class ChapterContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapters: props.chapters
    };

    this.handleChapterTitleClick = this.handleChapterTitleClick.bind(this);
  }

  handleChapterTitleClick(i) {
    console.log("CHAPTER TITLE CLICKED");
    console.log("Chapter " + (i + 1) + " clicked");
  }

  render() {
    return (
      <div className="chapterContainer">
        {this.state.chapters.map((chapter, index) => (
          <Chapter
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

function renderChapter() {}

export default ChapterContainer;
