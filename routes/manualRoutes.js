const express = require('express');
const router = express.Router();
const manualController = require('../controllers/manualController');

router.get('/download/:depth1/:depth2', manualController.downloadAPI);
router.get('/directory', manualController.scanDirectoryAPI);

module.exports = router;