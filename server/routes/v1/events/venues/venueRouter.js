var express = require('express');
var controller = require('../../crudCtrl');
var Venue = require('mongoose').model('Venue');
var tokenProtection = require('../../../../config/routeMiddleware');



// http://stackoverflow.com/questions/15995461/node-js-pass-variable-to-route
var router = express.Router();

router.use(tokenProtection);

router.get('/', function(req, res){
  controller.getModelItems(req, res, Venue);
});
router.get('/:id', function(req, res){
  controller.getModelItemById(req, res, Venue);
});
router.delete('/:id', function(req, res){
  controller.deleteModelItem(req, res, Venue);
});
router.put('/:id', function(req, res){
  controller.updateModelItem(req, res, Venue);
});
router.post('/', function(req, res){
  controller.createModelItem(req, res, Venue);
});


module.exports = router;