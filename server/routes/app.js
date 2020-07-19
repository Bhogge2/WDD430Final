var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'FinalProject' });
  res.sendFile(path.join(__dirname, 'dist/FinalProject/index.html'));
});

module.exports = router;