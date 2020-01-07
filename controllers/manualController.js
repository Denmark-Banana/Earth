const propertiesReader = require('properties-reader');
const path = require('path');
const fs = require('fs');
const dirTree = require('directory-tree');

const properties = propertiesReader('server.properties');
const ROOTPATH = properties.get('dir.location');
const pathDir = require('../path_dir');


function downloadAPI(req, res) {

    // const depth1 = req.params.depth1;
    // const depth2 = req.params.depth2;
    const depth1 = req.params.depth1;
    const depth2 = req.params.depth2;
    const filetype = ".pdf";

    const filePath = path.join(ROOTPATH, depth1, depth2, depth2 + filetype);

    if (fs.existsSync(filePath)) {
        res.download(filePath, function(err) {
            if (err) {
                console.log("error occured.");
            } else {
                console.log(depth2 + filetype + " file download complete.")
            }
        });
    } else {
        console.log("There are no files in that path");
        res.status(204).end();
    }
}


function scanDirectoryAPI(req, res) {
    if (fs.existsSync(ROOTPATH)) {

        const DirectoryTree = dirTree(ROOTPATH, { extensions: /\.(pdf)$/, normalizePath: true }, null,
            (item, PATH, stats) => {
                //console.log(item);
            }
        );
        pathDir.minimalPath(DirectoryTree, 'path', ROOTPATH);
        res.status(200).json({ DirectoryTree });
    } else {
        console.log("There are no files in that path");
        res.status(204).end();
    }
}

module.exports = { downloadAPI, scanDirectoryAPI }