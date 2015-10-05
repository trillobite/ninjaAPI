var router = require('express').Router();

router.use('/users', require('./users/usersRouter'));
router.use('/companies', require('./companies/companiesRouter'));

module.exports = router;