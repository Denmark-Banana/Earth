const dotenv = require('dotenv')
dotenv.config();
const ROOTPATH = process.env.DIR_LOCATION || 'root';
var pdfTotalcount = 0;

function splitPathofJSON(obj, keys) {
    pdfTotalcount = 0;
    traversalJSON(obj, keys, splitPath);
    return pdfTotalcount;
}

function countPdfofJSON(obj, keys) {
    traversalJSON(obj, keys, countPdf);
}

function traversalJSON(obj, keys) {
    for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            switch (typeof(obj[prop])) {
                case 'object':
                    traversalJSON(obj[prop], keys);
                    break;
                default:
                    if (keys.indexOf(prop) > -1) {
                        obj[prop] = splitPath(obj[prop]);
                    }
                    if (("extension").indexOf(prop) > -1 && obj[prop] === ".pdf") {
                        pdfTotalcount++;
                    }
                    break;               
            }
        }
    }
}

function splitPath(obj) {
    var index = obj.indexOf(ROOTPATH);
    if (index !== -1) {
        var startindex = index + ROOTPATH.length + 1;
        obj = obj.substr(startindex, obj.length);
    }
    if (obj === "")
        obj = "/";

    return obj;
}

function countPdf(obj) {
    //...?


}

module.exports = {
    splitPathofJSON: splitPathofJSON,
    countPdfofJSON: countPdfofJSON
}