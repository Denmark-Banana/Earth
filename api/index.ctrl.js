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
    else {
        console.log("There are no files in that path");
        res.status(204).end();
    }


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
}

module.exports = { downloadAPI, scanFolderAPI }