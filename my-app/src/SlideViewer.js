import React from "react";
import SlideDetail from "./SlideDetail.js";
import LargeView from "./LargeView.js";

//TODO: maybe use state here to manage updating with a new slide
// load before swapping to next to reduce lag

const SlideViewer = props => {
  let slide = props.slide;

  return (
    <div className="slide-viewer">
      <SlideDetail slideIndex={props.slideIndex} slide={slide} />
      <LargeView
        type={slide.slide_type}
        slideIndex={props.slideIndex}
        buttonOnClick={props.buttonOnClick}
        source={slide.source_path}
      />
    </div>
  );
};

// const LargeView = props => {
//   return (
//     <div className="image-viewer">
//       <button
//         onClick={() => props.buttonOnClick(props.slideIndex - 1)}
//         className="image-viewer-side-button"
//       >
//         {"<"}
//       </button>

//       {props.type == "image" ? (
//         <ImageView source={props.source} />
//       ) : (
//         <VideoView source={props.source} />
//       )}
//       <button
//         onClick={() => props.buttonOnClick(props.slideIndex + 1)}
//         className="image-viewer-side-button"
//       >
//         {">"}
//       </button>
//     </div>
//   );
// };

// const VideoView = props => {
//   return (
//     <div className="video-wrapper">
//       <div className="image-viewer-3-by-4">
//         <video autoPlay className="image-viewer-large-video" src={props.source}>
//           Failed to load{" "}
//         </video>
//       </div>
//     </div>
//   );
// };

// const ImageView = props => {
//   return (
//     <div className="image-wrapper">
//       <div
//         className="image-viewer-large-image image-viewer-3-by-4"
//         style={{ backgroundImage: `url(${props.source})` }}
//       />
//     </div>
//   );
// };

export default SlideViewer;
