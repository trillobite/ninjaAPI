var express = require('express');
var controller = require('./menuGroupsCtrl');
var tokenProtection = require('../../../../config/routeMiddleware');

var router = express.Router();

router.use(tokenProtection);
router.get('/', controller.getMenuGroups);
// router.get('/:id', controller.getMenuGroupById);
// router.delete('/:id', controller.deleteMenuGroup);
// router.put('/:id', controller.updateMenuGroup);
// router.post('/', controller.createMenuGroup);


module.exports = router;