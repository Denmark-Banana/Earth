const walk = require('walkdir');
const propertiesReader = require('properties-reader');
const path = require('path');
const fs = require('fs');
const dirTree = require('directory-tree');

const properties = propertiesReader('server.properties');



function downloadAPI (req, res) {

    const dir_loc = properties.get('dir.location');
    const category = req.params.category;
    const id = req.params.id;
    const filetype = ".pdf";

    const filePath = path.join(dir_loc, category, id, id + filetype);

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
    const startingPath = properties.get('dir.location');
    
    if(fs.existsSync(startingPath)) {

        const filteredTree = dirTree(startingPath, 
            { extensions: /\.(pdf)$/ }, null,
            (item, PATH, stats) => {
                //console.log(item);
            }
        );
        res.status(200).json(
            {   
                filteredTree    
            }
        )
    }
    else {
        res.status(404).end();
    }



// walk(startingPath, function(path, stat) {
//     console.log('found: ', path);
// });

// //filtering
// const emitter = walk(startingPath);
// emitter.on('file', function(filename, stat) {
//     console.log('file from emitter: ', filename);
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