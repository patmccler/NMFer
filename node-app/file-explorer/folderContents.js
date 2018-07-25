//
// libraries
const fs = require('fs');

/////////////////////////////////////////////////////////////////////
//
//    fetchManifest  : returns the JSON of the manifest for the NMF
//
//    (params)    : path to the manifest.json file
//    (returns)   : manifest in the folder or string
var fetchManifest = (path) => {
  let manifest;

  if(fs.existsSync(`./${path}/manifest.json`)){
     process.chdir(`./${path}`);
     manifest = JSON.parse(fs.readFileSync('manifest.json'));
  }else{
    return 'Bad Path';
  }

  process.chdir('../');

  return(manifest);
};

/////////////////////////////////////////////////////////////////////
//
//    Contains    : async function that returns an array of strings 
//                  for files
//
//    (params)    : path     - the filepath of the folder
//
//    (returns)   : promise that rejects if given a bad path
let contains = (path) => new Promise( (resolve, reject) => {

  let response = [];

  fs.readdir(path, (err, files) => {

    if(! err){
      files.forEach(file => {
        response.push(file);
      });
      resolve(response);
    } else {
      reject(err);
    }

  });

});

module.exports = {
  contains,
  fetchManifest
};
