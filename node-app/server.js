//
// libraries
const express = require('express');

//
// included files
const sources = require('./file-explorer/folderContents.js');
const verify = require('./file-explorer/fileValidation.js')

//
// constants
const HOST = 3000;

let app = express();

// Simple display stub right now, so far all the app can do is takes static
// paths and displays either the errors or the unused file content
let difference = sources.contains('NMF/nmf-1/content').then( (result) => {
  let manifest = sources.fetchManifest('/NMF/nmf-1');
  return verify.checkUnused(manifest.slides, result);
}, (error) =>{
  app.get('/', (req,res) => {
    res.send(error);
  });
}).then((result) => {
  app.get('/', (req,res) => {
    res.send({ans: result});
  });
}, (error) => {
  console.log(error);
});

app.listen(HOST);

