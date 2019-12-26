var express = require('express');
var router = express.Router();
const userController = require('../controllers');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', userController.basicAPI);
router.get('/test', userController.testAPI);
router.post('/test', userController.postTestAPI);

router.get('/download', function (req, res, next) {
    var filePath = "C:/Users/user/git/earth/pdf/1/manual1-1.pdf"; 

    res.download(filePath);    
});

module.exports = router;