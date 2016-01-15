var express = require('express');
var controller = require('../../crudCtrl');
var MenuItem = require('mongoose').model('MenuItem');
var tokenProtection = require('../../../../config/routeMiddleware');



 //http://stackoverflow.com/questions/15995461/node-js-pass-variable-to-route
var router = express.Router();

router.use(tokenProtection);
router.get('/', function(req, res){
  controller.getModelItems(req, res, MenuItem);
});
router.get('/:id', function(req, res){
  controller.getModelItemById(req, res, MenuItem);
});
router.delete('/:id', function(req, res){
  controller.deleteModelItem(req, res, MenuItem);
});
router.put('/:id', function(req, res){
  controller.updateModelItem(req, res, MenuItem);
});
router.post('/', function(req, res){
  controller.createModelItem(req, res, MenuItem);
});


module.exports = router;