import React, { Component } from 'react';

class Pictures extends Component {
  state = {photo: 'no.jpg'};
  
  componentDidMount() {
    fetch('http://localhost:3000/api/photos')
        .then( (res) => this.setState(
            {photo: <img src={res.url}/>}
            )
        );
  }

  render(){
      return(
        <div className="App">
          {this.state.photo}
        </div>
      );
  }
}

export default Pictures;