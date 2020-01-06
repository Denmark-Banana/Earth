const express = require('express');
const router = express.Router();
const manualController = require('../controllers/manualController');

router.get('/download/:category/:id', manualController.downloadAPI);
router.get('/directory', manualController.scanDirectoryAPI);

module.exports = router;