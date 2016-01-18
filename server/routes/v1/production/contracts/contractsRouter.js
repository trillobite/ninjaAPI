var express = require('express');
var controller = require('../../crudCtrl');
var Contract = require('mongoose').model('Contract');
var tokenProtection = require('../../../../config/routeMiddleware');



 //http://stackoverflow.com/questions/15995461/node-js-pass-variable-to-route
var router = express.Router();

router.use(tokenProtection);
router.get('/', function(req, res){
  controller.getModelItems(req, res, Contract);
});
router.get('/:id', function(req, res){
  controller.getModelItemById(req, res, Contract);
});
router.delete('/:id', function(req, res){
  controller.deleteModelItem(req, res, Contract);
});
router.put('/:id', function(req, res){
  controller.updateModelItem(req, res, Contract);
});
router.post('/', function(req, res){
  controller.createModelItem(req, res, Contract);
});


module.exports = router;