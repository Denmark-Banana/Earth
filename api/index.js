var express = require('express');
var router = express.Router();
const apiController = require('./index.ctrl');

router.get('/download', apiController.downloadAPI);
router.get('/scan', apiController.scanFolderAPI);

module.exports = router;