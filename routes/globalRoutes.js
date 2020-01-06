var express = require('express');
var router = express.Router();
const globalController = require('../controllers/globalController');

router.get('/', globalController.home);
router.get('/test', globalController.testAPI);
router.post('/test', globalController.postTestAPI);

module.exports = router;