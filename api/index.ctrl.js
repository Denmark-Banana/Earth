var walk = require('walkdir');

function downloadAPI (req, res) {
    var filePath = "C:/Users/user/git/earth/pdf/1/manual1-1.pdf"; 
    //properties파일을 만들어서 그 경로에 있는 폴더를 작성
    res.download(filePath);
    //next();    
}

function scanFolderAPI (req, res) {
    res.status(200).json(
        {
            "success" : true
        }
    )
    
// //async with path callback 
// var startingPath = './pdf';

// walk(startingPath, function(path, stat) {
//   console.log('found: ', path);
// });

// //use async emitter to capture more events
// var emitter = walk(startingPath);

// emitter.on('file', function(filename, stat) {
//   console.log('file from emitter: ', filename);
// });


// //sync with callback
// walk.sync(startingPath, function(path, stat) {
//   console.log('found sync:', path);
// });

// //sync just need paths
// var paths = walk.sync(startingPath);
// console.log('found paths sync: ', paths);

// //async await/promise!
// let result = await walk.async(startingPath,{return_object:true})
// result['path'] = {statObject}
    //next();    
}

module.exports = { downloadAPI, scanFolderAPI }