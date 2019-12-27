const express = require('express');
const router = express.Router();
const apiController = require('./index.ctrl');

router.get('/download/:category/:id', apiController.downloadAPI);
router.get('/scan', apiController.scanFolderAPI);

module.exports = router;