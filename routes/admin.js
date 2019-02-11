var express = require('express');
var router = express.Router();
const path = require('path');
const dirname1 = __dirname.replace('\\routes', '')
console.log(dirname1)
/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(dirname1, 'admin', 'index.html'));
});

module.exports = router;
