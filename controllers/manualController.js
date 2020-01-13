const path = require('path');
const fs = require('fs');
const directory = require('../models/Directory');
const dotenv = require('dotenv')
dotenv.config();
const ROOTPATH = process.env.DIR_LOCATION || 'root';


function downloadAPI(req, res) {
    const queryPath = req.query.path;
    if (typeof(queryPath) !== 'string') {
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
        res.status(404).end();
    }
}

function scanDirectoryAPI(req, res) {
    if (fs.existsSync(ROOTPATH)) {
        var dirObject = directory.scan();
        const PdfTotalCount = dirObject.PdfTotalCount;
        const DirectoryTree = dirObject.JsonTree;

        res.status(200).json({ PdfTotalCount, DirectoryTree });
    } else {
        console.log("There are no files in that path");
        res.status(404).end();
    }
}

module.exports = { downloadAPI, scanDirectoryAPI }