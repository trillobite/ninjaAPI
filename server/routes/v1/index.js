var router = require('express').Router();

router.use('/users', require('./users'));
router.use('/companies', require('./companies'));

module.exports = router;