var express = require('express');
var router = express.Router();
var auth = require('../../../config/auth');
var controller = require('./companiesCtrl');




// Base Route /api/companies
router.get('/', controller.getCompanies);
router.put('/:id/verify', controller.verifyCompany);
//router.put('/:id/verify', function(req,res){res.send('hello');});
router.get('/:id', controller.getCompanyById);
// post request creates a new company and new admin user account
//router.post('/', controller.createCompany);
//router.get('/', controller.getCompanies);

module.exports = router;