var express = require('express');
var router = express.Router();
const apiController = require('./index.ctrl');

router.get('/download/:category/:id', apiController.downloadAPI);
router.get('/scan', apiController.scanFolderAPI);

module.exports = router;