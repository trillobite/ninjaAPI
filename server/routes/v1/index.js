var router = require('express').Router();

console.log('v1 routes');
router.use('/account', require('./account/accountRouter'));
router.use('/users', require('./users/usersRouter'));
router.use('/companies', require('./companies/companiesRouter'));
router.use('/production', require('./production'));
router.use('/common', require('./common/commonRouter'));
router.use('/customers', require('./customers/customersRouter'));

module.exports = router;