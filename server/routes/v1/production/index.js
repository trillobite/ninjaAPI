var router = require('express').Router();

router.use('/menuitems', require('./menuItems/menuItemsRouter'));
router.use('/menus', require('./menus/menusRouter'));
router.use('/menugroups', require('./menuGroups/menuGroupsRouter'));
router.use('/rentalitems', require('./rentalItems/rentalItemsRouter'));
router.use('/venues', require('./venues/venueRouter'));
router.use('/contracts', require('./contracts/contractsRouter'));

module.exports = router;