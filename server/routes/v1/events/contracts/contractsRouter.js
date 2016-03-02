var express = require('express');
var controller = require('../../crudCtrl');
var Contract = require('mongoose').model('Contract');
var contractsCtrl = require('./contractsCtrl');
var tokenProtection = require('../../../../config/routeMiddleware');



 //http://stackoverflow.com/questions/15995461/node-js-pass-variable-to-route
var router = express.Router();

router.use(tokenProtection);
router.get('/', function(req, res){
  controller.getModelItems(req, res, Contract);
});
router.get('/:id', function(req, res){
  // build queryOptions object
  // we can optionally append to queryOptions
  // pass queryOptions to crudContoller
  
  var population = {
      path: 'customer'
  };
  
  controller.getModelItemById(req, res, Contract, population);
});
router.delete('/:id', function(req, res){
  controller.deleteModelItem(req, res, Contract);
});
router.put('/:id', function(req, res){
    var population = {
      path: 'customer'
  };
  controller.updateModelItem(req, res, Contract, population);
  
});
router.post('/', function(req, res){
  contractsCtrl.createContract(req, res, Contract);
});


module.exports = router;