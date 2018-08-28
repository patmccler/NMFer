import React, { Component } from "react";
import SlideThumb from "./SlideThumb.js";
import ChapterContainer from "./ChapterContainer.js";

const OverviewSection = props => {
  return (
    <div className="overview-section">
      {props.slides ? (
        <ChapterContainer {...props} />
      ) : (
        <span key="default">NO SLIDES FOUND</span>
      )}
    </div>
  );
};

export default OverviewSection;
