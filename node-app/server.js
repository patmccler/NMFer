//
// libraries
const express = require('express');
const hbs = require('hbs');

//
// included files
const sources = require('./file-explorer/folderContents.js');
const verify = require('./file-explorer/fileValidation.js')

//
// constants
const HOST =  process.env.PORT || 3000;;

// start app, set views directory, set partials directory
let app = express();

app.set('views', __dirname + '/src/views');
hbs.registerPartials(__dirname + '/src/views/partials');

app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'NMF Home'
  });
});

app.get('/validation', (req,res) => {
  // Simple display stub right now, so far all the app can do is takes static
  // paths and displays either the errors or the unused file content
  let difference = sources.contains('NMF/nmf-1/content').then( (result) => {
    let manifest = sources.fetchManifest('/NMF/nmf-1');
    return verify.checkUnused(manifest.slides, result);
  }, (error) =>{
    app.get('/validation', (req,res) => {
      res.send(error);
    });
  }).then((result) => {
    res.send({ans: result});
  }, (error) => {
    console.log(error);
  });
});

app.listen(HOST);

