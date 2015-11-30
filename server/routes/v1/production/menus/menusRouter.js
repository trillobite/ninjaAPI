var express = require('express');
var controller = require('./menusCtrl');
var tokenProtection = require('../../../../config/routeMiddleware');

var router = express.Router();
router.use(tokenProtection);
router.get('/', controller.getMenus);
// router.get('/:id', controller.getMenuById);
// router.delete('/:id', controller.deleteMenu);
// router.put('/:id', controller.updateMenu);
// router.post('/', controller.createMenu);


module.exports = router;