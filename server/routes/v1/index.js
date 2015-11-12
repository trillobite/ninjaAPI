var router = require('express').Router();


router.use('/account', require('./account/accountRouter'));
router.use('/users', require('./users/usersRouter'));
router.use('/companies', require('./companies/companiesRouter'));
router.use('/menuItems', require('./menuItem/menuItemRouter'));

module.exports = router;