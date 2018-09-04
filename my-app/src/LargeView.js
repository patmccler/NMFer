import React from "react";

const LargeView = props => {
  return (
    <div className="image-viewer">
      <button
        onClick={() => props.buttonOnClick(props.slideIndex - 1)}
        className="image-viewer-side-button"
      >
        {"<"}
      </button>

      {props.type == "image" ? (
        <ImageView source={props.source} />
      ) : (
        <VideoView source={props.source} />
      )}
      <button
        onClick={() => props.buttonOnClick(props.slideIndex + 1)}
        className="image-viewer-side-button"
      >
        {">"}
      </button>
    </div>
  );
};

const VideoView = props => {
  return (
    <div className="video-wrapper">
      <div className="image-viewer-3-by-4">
        <video autoPlay className="image-viewer-large-video" src={props.source}>
          Failed to load{" "}
        </video>
      </div>
    </div>
  );
};

const ImageView = props => {
  return (
    <div className="image-wrapper">
      <div
        className="image-viewer-large-image image-viewer-3-by-4"
        style={{ backgroundImage: `url(${props.source})` }}
      />
    </div>
  );
};

export default LargeView;
