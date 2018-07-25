/////////////////////////////////////////////////////////////////////////////
//
//    checkedUnused   : async function that checks that files present in
//                      content
//
//    (params)        : slides    - slides in the manifest (arr of obj)
//                    : fileNames - file names in the content folder
//
//    (returns)       : promise that rejects if there are no slides or files
//                      and resolves the unused files
let checkUnused = (slides, fileNames) => new Promise( (resolve, reject) =>{
  if(!slides.length || slides.length === 0 || !fileNames.length ){
    reject({err : 'slides or files not present'});
  }
  if(slides.length === fileNames.length){
    resolve([]);
  } else {
    for(let i = 0; i < slides.length; ++i){
      let temp = slides[i].content_file_name
        .substr(slides[i].content_file_name.indexOf('/') + 1);
      if(fileNames.includes(temp)){
        fileNames.splice(fileNames.indexOf(temp), 1);
      }
    }
    resolve(fileNames);
  }
});

module.exports = {
  checkUnused
}
