function minimalPath(obj, keys, rootPath) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            switch (typeof(obj[prop])) {
                case 'object':
                    if (keys.indexOf(prop) > -1) {
                        obj[prop] = splitPath(obj[prop], rootPath);
                        //delete obj[prop];
                    } else {
                        minimalPath(obj[prop], keys, rootPath);
                    }
                    break;
                default:
                    if (keys.indexOf(prop) > -1) {
                        obj[prop] = splitPath(obj[prop], rootPath);
                        //delete obj[prop];
                    }
                    break;
            }
        }
    }
}

function splitPath(obj, rootPath) {
    var index = obj.indexOf(rootPath);
    if (index !== -1) {
        var startindex = index + rootPath.length + 1;
        obj = obj.substr(startindex, obj.length);
    }
    if (obj === "")
        obj = "/";

    return obj;
}

module.exports = {
    minimalPath: minimalPath,
    splitPath: splitPath,
}