import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Users from './pages/Users.js';
import UploadNMF from './pages/UploadNMF.js';
import Pictures from './pages/Pictures.js';
import './App.css';

// simple multiple page routing system
class Routing extends Component {
  render() {
    return(
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/upload_nmf">File Upload</Link>
            </li>
            <li>
              <Link to="/pictures">Pictures</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/users" component={UserPage} />
          <Route path="/upload_nmf" component={UploadFile} />
          <Route path="/pictures" component={PictureDisplay}/>
        </div>
      </Router>
    );
  };
}

// simple home page
const Home = () => (
  <div>
    <h2>Home Example</h2>
    <p>This is where some sort of greeting will go</p>
  </div>
);

// this is for rendering a users page example
const UserPage = () => (
  <div id="users-page">
    <Users/>
  </div>
);

const UploadFile = () => (
  <div id="upload-files">
    <UploadNMF />
  </div>
);

const PictureDisplay = () => (
  <div id="pictures">
    <Pictures />
  </div>
);

class App extends Component {
  render() {
    return <Routing />;
  };
}

export default App;
