var router = require('express').Router();

router.use('/account', require('./account/accountRouter'));
router.use('/users', require('./users/usersRouter'));
router.use('/companies', require('./companies/companiesRouter'));
router.use('/production', require('./production'));
router.use('/common', require('./common/commonRouter'));
router.use('/customers', require('./customers/customersRouter'));
router.use('/customerSearch', require('./customers/customerSearchRouter'));
router.use('/events', require('./events'));


module.exports = router;