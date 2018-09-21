import React from "react";
import ChapterContainer from "./ChapterContainer.js";

const OverviewSection = props => {
  const chapterContainerProps = {
    handleThumbClick: props.handleThumbClick,
    selectedSlide: props.selectedSlide
  };
  //the slides
  let slides = props.slides ? props.slides : [];

  //array to hold slides until a whole chapter is determined
  let currentChapter = [];
  let currentChapterTitle = "";
  //array of objects with a list of slides and the title
  let chapters = [];
  let chapterWithSelectedSlide;

  //determines how the slides should be divided into chapters
  slides.forEach((slide, index) => {
    slide.index = index;
    //if this slide has a chapter title, start a new chapter
    if (slide.chapter_title) {
      if (currentChapterTitle !== "") {
        chapters.push({ slides: currentChapter, title: currentChapterTitle });
      }
      currentChapter = [];
      currentChapterTitle = slide.chapter_title;
    }
    //test for slide being selected so we can save that chapter
    if (index === props.selectedSlide) {
      chapterWithSelectedSlide = chapters.length;
    }
    currentChapter.push(slide);
  });

  //adding final chapter
  chapters.push({ slides: currentChapter, title: currentChapterTitle });
  currentChapter = [];

  return (
    <div className="overview-section">
      {slides.length > 0 ? (
        <ChapterContainer
          chapters={chapters}
          chapterWithSelectedSlide={chapterWithSelectedSlide}
          {...chapterContainerProps}
        />
      ) : (
        <span key="default">LOAD SOMETHING!</span>
      )}
    </div>
  );
};

export default OverviewSection;
