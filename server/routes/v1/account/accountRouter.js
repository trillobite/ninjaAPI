var express = require('express');
var router = express.Router();
//var auth = require('../../../config/auth');
var controller = require('./accountCtrl');
var tokenProtection = require('../../../config/routeMiddleware');


// routes above here are unprotected
router.use(tokenProtection);


// Base Route /api/account
router.get('/', controller.getCompanies);
//router.put('/:id/verify', controller.verifyCompany);
router.get('/:id', controller.getCompanyById);
// post request creates a new company and new admin user account
//router.post('/', controller.createCompany);
//router.get('/', controller.getCompanies);

module.exports = router;