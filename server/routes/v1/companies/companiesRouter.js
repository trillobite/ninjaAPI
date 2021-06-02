var express = require('express');
var router = express.Router();
//var auth = require('../../../config/auth');
var controller = require('./companiesCtrl');
var tokenProtection = require('../../../config/routeMiddleware');


router.get('/', controller.getCompanies);

// routes above here are unprotected
router.use(tokenProtection);


// Base Route /api/companies

//router.put('/:id/verify', controller.verifyCompany);
router.get('/:id', controller.getCompanyById);
// post request creates a new company and new admin user account
//router.post('/', controller.createCompany);
//router.get('/', controller.getCompanies);

module.exports = router;