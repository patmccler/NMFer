import React, { Component } from "react";
import SlideDetail from "./SlideDetail.js";

class SlideDetailContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsMinimized: props.detailsMinimized
    };

    this.handleSlideDetailToggle = this.handleSlideDetailToggle.bind(this);
  }

  handleSlideDetailToggle() {
    console.log("toggling slide detail display");
    this.setState((prevState, props) => {
      return { detailsMinimized: !prevState.detailsMinimized };
    });
  }

  render() {
    return (
      <SlideDetail
        handleToggle={this.handleSlideDetailToggle}
        minimized={this.state.detailsMinimized}
        {...this.props.slide}
        requestSlideChange={this.props.requestSlideChange}
      />
    );
  }
}

SlideDetailContainer.defaultProps = {
  detailsMinimized: false
};

export default SlideDetailContainer;
