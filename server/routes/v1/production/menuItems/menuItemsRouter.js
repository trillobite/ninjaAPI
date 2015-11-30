var express = require('express');
var controller = require('./menuItemsCtrl');
var tokenProtection = require('../../../../config/routeMiddleware');

var router = express.Router();
router.use(tokenProtection);
router.get('/', controller.getMenuItems);
router.get('/:id', controller.getMenuItemById);
router.delete('/:id', controller.deleteMenuItem);
router.put('/:id', controller.updateMenuItem);
router.post('/', controller.createMenuItem);


module.exports = router;