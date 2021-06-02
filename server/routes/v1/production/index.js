var router = require('express').Router();

router.use('/menuitems', require('./menuItems/menuItemsRouter'));
router.use('/menus', require('./menus/menusRouter'));
router.use('/menugroups', require('./menuGroups/menuGroupsRouter'));

module.exports = router;