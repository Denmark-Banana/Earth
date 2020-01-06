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

function scanDirectoryAPI (req, res) {
    const startingPath = properties.get('dir.location');
    
    if(fs.existsSync(startingPath)) {

        const DirectoryTree = dirTree(startingPath, 
            { extensions: /\.(pdf)$/ }, null,
            (item, PATH, stats) => {
                //console.log(item);
            }
        );
        res.status(200).json({ DirectoryTree });
    }
    else {
        console.log("There are no files in that path");
        res.status(204).end();
    }
}

module.exports = { downloadAPI, scanDirectoryAPI }