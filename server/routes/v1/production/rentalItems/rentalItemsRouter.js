var express = require('express');
var controller = require('./rentalItemsCtrl');
var tokenProtection = require('../../../../config/routeMiddleware');




var router = express.Router();



router.use(tokenProtection);
router.get('/', controller.getRentalItems);
router.get('/:id', controller.getRentalItemById);
router.delete('/:id', controller.deleteRentalItem);
router.put('/:id', controller.updateRentalItem);
router.post('/', controller.createRentalItem);


module.exports = router;