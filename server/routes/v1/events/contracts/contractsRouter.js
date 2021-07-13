var express = require('express');
var controller = require('../../crudCtrl');
var contractsController = require('./contractsCtrl');
var Contract = require('mongoose').model('Contract');
var tokenProtection = require('../../../../config/routeMiddleware');



 //http://stackoverflow.com/questions/15995461/node-js-pass-variable-to-route
var router = express.Router();

router.use(tokenProtection);
router.get('/', function(req, res){
  req.query.populate = req.query.populate || {'customer': ""};
  // var population = {'customer': {'select':''}};
  //   req.query.populate = population;
  controller.getModelItems(req, res, Contract);
});
router.get('/:id', function(req, res){
  var population = {'customer': {'select':''}};
    req.query.populate = population;
  controller.getModelItemById(req, res, Contract);
});
router.get('/:id/view/handoutPdf', (req, res) => {
  contractsController.viewHandoutPdf(req, res, Contract);
});
router.get('/:id/view/pdf', function(req, res){
  contractsController.viewPdf(req, res, Contract);
});
router.delete('/:id', function(req, res){
  controller.deleteModelItem(req, res, Contract);
});
router.put('/:id', function(req, res){
  var population = {'customer': {'select':''}};
  req.query.populate = population;
  controller.updateModelItem(req, res, Contract, population);
});
router.post('/', function(req, res){
  var population = { path: 'customer', select: ''};
  req.query.populate = population;
  controller.createModelItem(req, res, Contract, population);
});


module.exports = router;