import Dropzone from 'react-dropzone';
import React, { Component } from 'react';

class UploadNMF extends Component {
    constructor() {
        super()
        this.state = { files: [] }
      }
    
      onDrop(files) {
        this.setState({
          files
        });
      }

    render(){
        return(
        <section>
            <div className="dropzone">
                <Dropzone onDrop={this.onDrop.bind(this)}>
                    <p>drop here</p>
                </Dropzone>
            </div>
            <aside>
                <h2>Dropped files</h2>
                <ul>
                    {
                    this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
                    }
                </ul>
            </aside>
        </section>
        );
    }
};

export default UploadNMF;