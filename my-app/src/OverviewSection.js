import React, { Component } from "react";
import SlideThumb from "./SlideThumb.js";
import ChapterContainer from "./ChapterContainer.js";

const OverviewSection = props => {
  console.log(props);
  const chapterProps = {
    onClick: props.onClick,
    selectedSlide: props.selectedSlide
  };
  //the slides
  let slides = props.slides;
  if (!slides) {
    return;
  }
  //array to hold slides until a whole chapter is determined
  let currentChapter = [];
  let currentChapterTitle = "";
  //array of objects with a list of slides and the title
  let chapters = [];
  let chapterWithSelectedSlide;

  slides.map((slide, index) => {
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
      {slides ? (
        <ChapterContainer
          chapters={chapters}
          chapterWithSelectedSlide={chapterWithSelectedSlide}
          {...props}
        />
      ) : (
        <span key="default">NO SLIDES FOUND</span>
      )}
    </div>
  );
};

export default OverviewSection;
