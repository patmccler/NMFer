//
// libraries
const express = require('express');

//
// included files
const sources = require('./files/folderContents.js');
const verify = require('./files/fileValidation.js')

//
// constants
const HOST = 3000;

let app = express();

// Simple display stub right now, so far all the app can do is takes static
// paths and displays either the errors or the unused file content
let difference = sources.contains('test-file/content').then( (result) => {
  let manifest = sources.fetchManifest('/test-file');
  return verify.checkUnused(manifest.slides, result);
}, (error) =>{
  app.get('/', (req,res) => {
    res.send(error)
  });
}).then((result) => {
  app.get('/', (req,res) => {
    res.send({ans: result});
  });
}, (error) => {
  app.get('/', (req,res) => {
    res.send(error)
  });
});

app.listen(HOST);

