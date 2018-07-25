import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "./logo.svg";
import "./App.css";

var getFile = function getFile() {
  var files = document.getElementById("input-file").files;

  if (files[0]) {
    var fr = new FileReader();

    fr.onload = e => {
      var file = fr.result;
      console.log(file);

      var fileObj = JSON.parse(file);
      console.log(fileObj);
    };

    fr.readAsText(files[0]);

    console.log(files[0]);
  }
};

const Message = props => {
  if (!props.msg) {
    return <div>No Message</div>;
  }
  if (props.msg[0] && !(typeof props.msg === "string")) {
    let response = [];
    for (let i = 0; i < props.msg.length; i++) {
      response.push(<span>{props.msg[i] + " "}</span>);
    }
    return response;
  }

  return (
    <div
      style={{
        borderWidth: 5,
        borderColor: "black",
        paddingTop: 15,
        paddingLeft: 10,
        borderStyle: "dashed"
      }}
      className="box box--small"
    >
      {props.msg}
    </div>
  );
};
Message.propTypes = {
  msg: PropTypes.string.isRequired
};

const Element = props => (
  <div className="container">
    <Message msg={props.msg1} />
    <br />
    <Message msg={props.msg2} />
    <br />
  </div>
);

const Time = props => {
  const time = new Date().toLocaleTimeString();
  const element = <div>It is {time}</div>;

  return element;
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <input id="input-file" type="file" />
        <button onClick={getFile}>Select File</button>
        <Element msg1="Hello World" msg2="Goodbye World" />
        <Time />
      </div>
    );
  }
}

export default App;
