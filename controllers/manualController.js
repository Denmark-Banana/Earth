const propertiesReader = require('properties-reader');
const path = require('path');
const fs = require('fs');
const dirTree = require('directory-tree');

const properties = propertiesReader('server.properties');


function downloadAPI (req, res) {

    const dir_loc = properties.get('dir.location');
    // const depth1 = req.params.depth1;
    // const depth2 = req.params.depth2;
    const depth1 = req.params.depth1;
    const depth2 = req.params.depth2;
    const filetype = ".pdf";

    const filePath = path.join(dir_loc, depth1, depth2, depth2 + filetype);

    if(fs.existsSync(filePath)) {
        res.download(filePath, function(err) {
            if(err) {
                console.log("error occured.");
            } else {
                console.log(depth2 + filetype + " file download complete.")
            }
        });
    }
    else {
        console.log("There are no files in that path");
        res.status(204).end();
    }


}

function removeKeys(obj, keys) {
    for (var prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            switch(typeof(obj[prop])) {
                case 'object':
                    if(keys.indexOf(prop) > -1) {
                        delete obj[prop];
                    } else {
                        removeKeys(obj[prop], keys);
                    }
                    break;
              default:
                    if(keys.indexOf(prop) > -1) {
                        delete obj[prop];
                    }
                    break;
            }
        }
    }
}

var traverse = function(o, fn) {
    for (var i in o) {
      fn.apply(this,[i,o[i]]);  
      if (o[i] !== null && typeof(o[i])=="object") {
        traverse(o[i], fn);
      }
    }
}

function splitPath(obj, stPath) {
    console.log(obj);
    for(var key in obj) {
        var objPath = obj(key).path;
        var index = objPath.indexOf(stPath);
        obj(key).path = objPath.substr(index, objPath.length);
    }
}

function scanDirectoryAPI (req, res) {
    const startingPath = properties.get('dir.location');
    
    if(fs.existsSync(startingPath)) {

        const DirectoryTree = dirTree(startingPath, 
            { extensions: /\.(pdf)$/, normalizePath: true }, null,
            (item, PATH, stats) => {
                //console.log(item);
            }
        );
        removeKeys(DirectoryTree, 'size');
        res.status(200).json({ DirectoryTree });
    }
    else {
        console.log("There are no files in that path");
        res.status(204).end();
    }
}

module.exports = { downloadAPI, scanDirectoryAPI }