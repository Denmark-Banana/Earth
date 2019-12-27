var walk = require('walkdir');
var propertiesReader = require('properties-reader');
var path = require('path');
var properties = propertiesReader('server.properties');

function downloadAPI (req, res) {

    var filePath = path.join(properties.get('file.location'),"/1/manual1-1.pdf");

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