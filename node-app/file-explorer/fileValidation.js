// helper fcn to check if input to check unused was good
let goodInput = (slides, fileNames) => {
  if( slides == null || fileNames == null){
    return false;
  } 

  if(slides.length === 0 ) {
    return false;
  }

  if(!Array.isArray(slides) || !Array.isArray(fileNames)){
    return false;
  }

  return true;
};

// helper fcn that returns the content name
let getSlideContent = (slide) => {
  return slide.content_file_name
    .substr(slide.content_file_name.indexOf('/') + 1);
}

///////////////////////////////////////////////////////////////////////////////////////////
//
//    checkedUnused   : async function that checks that links in slides are present in
//                      /content and that all /content files are used
//
//    (params)        : slides    - slides in the manifest (arr of obj)
//                    : fileNames - file names in the content folder
//
//    (returns)       : promise that rejects an error object and resolves an object
//                      with the unused files and files n
let checkUnused = (slides, fileNames) => new Promise( (resolve, reject) =>{
  if(! goodInput(slides,fileNames) ){
    reject({err : 'slides or files not present'});
  }

  if(slides.length === fileNames.length){
    resolve({unusedFiles: [], fileNotFound: []});
  } else {

    var obj = {
      unusedFiles: [], 
      fileNotFound: []
    };

    for(let i = 0; i < slides.length; ++i){
      let temp = getSlideContent(slides[i]);
      if(fileNames.includes(temp)){
        fileNames.splice(fileNames.indexOf(temp), 1);
      } else {
        obj.fileNotFound.push(temp);
      }
    }

    obj.unusedFiles = fileNames;

    resolve(obj);
  }
  resolve('Uncaught Error occured');
});

module.exports = {
  checkUnused
}
