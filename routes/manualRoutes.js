const express = require('express');
const router = express.Router();
const manualController = require('../controllers/manualController');

router.get('/download/:category/:id', manualController.downloadAPI);
router.get('/scan', manualController.scanFolderAPI);

module.exports = router;