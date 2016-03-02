var express = require('express');
var searchController = require('./searchController');
var Customer = require('mongoose').model('Customer');
var tokenProtection = require('../../../config/routeMiddleware');



 //http://stackoverflow.com/questions/15995461/node-js-pass-variable-to-route
var router = express.Router();

router.use(tokenProtection);
router.get('/', function(req, res){
    console.log(req.query);
    searchController.searchCustomers(req, res, Customer);
});


module.exports = router;