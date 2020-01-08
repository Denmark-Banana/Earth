const propertiesReader = require('properties-reader');
const path = require('path');
const fs = require('fs');
const dirTree = require('directory-tree');

const properties = propertiesReader('server.properties');
const ROOTPATH = properties.get('dir.location');
const pathDir = require('../path_dir');


function downloadAPI(req, res) {
    const queryPath = req.query.path;
    if(typeof(queryPath) !== 'string') {
        console.log("path is not string in the query statement.");
        res.status(400).end();
    }
    const filePath = path.join(ROOTPATH, queryPath);

    if (fs.existsSync(filePath)) {
        res.download(filePath, function(err) {
            if (err) {
                console.log(`${err} error occured.`);
                res.status(400).end();
            } else {
                console.log("file download complete.")
            }
        });
    } else {
        console.log("There are no files in that path.");
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