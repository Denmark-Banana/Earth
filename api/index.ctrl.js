var walk = require('walkdir');
var propertiesReader = require('properties-reader');
var path = require('path');
const fs = require('fs');

var properties = propertiesReader('server.properties');



function downloadAPI (req, res) {

    var dir_loc = properties.get('dir.location');
    var category = req.params.category;
    var id = req.params.id;
    var filetype = ".pdf";

    var filePath = path.join(dir_loc, category, id, id + filetype);

    if(fs.existsSync(filePath)) {
        res.download(filePath, function(err) {
            if(err) {
                console.log("error occured.");
            } else {
                console.log(id + filetype + " file download complete.")
            }
        });
    }
    else
        res.status(204).end();


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