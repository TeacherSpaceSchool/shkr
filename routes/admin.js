var express = require('express');
var router = express.Router();
const path = require('path');
const dirname = __dirname.replace('\\routes', '')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(dirname, 'admin', 'index.html'));
});

module.exports = router;
