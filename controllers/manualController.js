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

function renamePath(obj, keys) {
    const startingPath = properties.get('dir.location');
    for (var prop in obj) {
        if(obj.hasOwnProperty(prop)) {
            switch(typeof(obj[prop])) {
                case 'object':
                    if(keys.indexOf(prop) > -1) {
                        console.log('first: ' + obj[prop]);
                        //delete obj[prop];
                    } else {
                        renamePath(obj[prop], keys);
                    }
                    break;
              default:
                    if(keys.indexOf(prop) > -1) {
                        obj[prop] = splitPath(obj[prop], startingPath);
                        console.log('second: ' + obj[prop]);
                        obj[prop] = "";
                        //delete obj[prop];
                    }
                    break;
            }
        }
    }
}

function splitPath(obj, stPath) {
    var index = obj.indexOf(stPath);
    obj = obj.substr(index, obj.length);
    return obj;
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
        renamePath(DirectoryTree, 'path');
        res.status(200).json({ DirectoryTree });
    }
    else {
        console.log("There are no files in that path");
        res.status(204).end();
    }
}

module.exports = { downloadAPI, scanDirectoryAPI }