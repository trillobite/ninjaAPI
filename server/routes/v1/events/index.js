var router = require('express').Router();

router.use('/rentalitems', require('./rentalItems/rentalItemsRouter'));
router.use('/venues', require('./venues/venueRouter'));
router.use('/contracts', require('./contracts/contractsRouter'));

module.exports = router;