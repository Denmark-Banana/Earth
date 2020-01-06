var express = require('express');
var router = express.Router();
const globalController = require('../controllers/globalController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//router.get('/', userController.basicAPI);
router.get('/test', globalController.testAPI);
router.post('/test', globalController.postTestAPI);

module.exports = router;