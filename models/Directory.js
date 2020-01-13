const dirTree = require('directory-tree');
const dotenv = require('dotenv')
dotenv.config();
const ROOTPATH = process.env.DIR_LOCATION || 'root';

function scan() {
    var PdfTotalCount = 0;
    const JsonTree = dirTree(ROOTPATH, { extensions: /\.(pdf)$/, normalizePath: true },
        //Each File
        (item, PATH, stats) => {
            item['path'] = splitPath(item['path']);
            if (item['extension'] === '.pdf') { PdfTotalCount++; }
        },
        //Each Directory
        (item, PATH, stats) => { item['path'] = splitPath(item['path']); }
    );
    const dirObject = { JsonTree, PdfTotalCount };
    return dirObject;
}

function splitPath(originPath) {
    return originPath.substr(ROOTPATH.length + 1, originPath.length) || '/';
}

module.exports = { scan }