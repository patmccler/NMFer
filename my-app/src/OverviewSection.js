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

  slides.map((slide, index) => {
    slide.index = index;
    //if this slide has a chapter title, start a new chapter
    if (slide.chapter_title) {
      if (currentChapterTitle !== "") {
        chapters.push({ slides: currentChapter, title: currentChapterTitle });
      }
      currentChapter = [slide];
      currentChapterTitle = slide.chapter_title;
    } else {
      currentChapter.push(slide);
    }
  });

  //adding final chapter
  chapters.push({ slides: currentChapter, title: currentChapterTitle });
  currentChapter = [];

  return (
    <div className="overview-section">
      {slides ? (
        <ChapterContainer chapters={chapters} {...props} />
      ) : (
        <span key="default">NO SLIDES FOUND</span>
      )}
    </div>
  );
};

export default OverviewSection;
