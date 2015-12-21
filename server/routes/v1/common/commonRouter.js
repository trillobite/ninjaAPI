var express = require('express');
var router = express.Router();

var tokenProtection = require('../../../config/routeMiddleware');

router.get('/lookups', function (req, res) {
    res.send('whats up dude!');
});
// routes above here are unprotected
router.use(tokenProtection);




module.exports = router;