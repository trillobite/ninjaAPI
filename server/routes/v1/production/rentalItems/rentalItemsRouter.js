var express = require('express');
var controller = require('../../crudCtrl');
var RentalItem = require('mongoose').model('RentalItem');
var tokenProtection = require('../../../../config/routeMiddleware');



 //http://stackoverflow.com/questions/15995461/node-js-pass-variable-to-route
var router = express.Router();

router.use(tokenProtection);
router.get('/', function(req, res){
  controller.getModelItems(req, res, RentalItem);
});
router.get('/:id', function(req, res){
  controller.getModelItemById(req, res, RentalItem);
});
router.delete('/:id', function(req, res){
  controller.deleteModelItem(req, res, RentalItem);
});
router.put('/:id', function(req, res){
  controller.updateModelItem(req, res, RentalItem);
});
router.post('/', function(req, res){
  controller.createModelItem(req, res, RentalItem);
});


module.exports = router;