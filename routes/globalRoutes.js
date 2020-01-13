var express = require('express');
var router = express.Router();
const globalController = require('../controllers/globalController');

router.get('/', globalController.home);

module.exports = router;