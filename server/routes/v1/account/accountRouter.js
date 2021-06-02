var express = require('express');
var router = express.Router();
var authController = require('../../../config/auth');
var accountController = require('./accountCtrl');
var tokenProtection = require('../../../config/routeMiddleware');

router.post('/login', authController.authenticate2);

router.post('/logout', function(req, res){
	// I believe we need to destroy the token before sending success
	res.send({success: true});
});

router.post('/', accountController.createNewAccount);


// routes above here are unprotected
router.use(tokenProtection);


// Base Route /api/account
//router.get('/', controller.getCompanies);
//router.put('/:id/verify', controller.verifyCompany);
//router.get('/:id', controller.getCompanyById);
// post request creates a new company and new admin user account
//router.post('/', controller.createCompany);
//router.get('/', controller.getCompanies);

module.exports = router;