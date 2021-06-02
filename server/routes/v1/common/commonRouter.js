var express = require('express');
var router = express.Router();
var controller = require('./lookupsCtrl');

var tokenProtection = require('../../../config/routeMiddleware');


// routes above here are unprotected
router.use(tokenProtection);
router.get('/lookups', controller.getLookups);




module.exports = router;