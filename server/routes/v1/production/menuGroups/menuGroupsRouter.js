var express = require('express');
var controller = require('../../crudCtrl');
var MenuGroup = require('mongoose').model('MenuGroup');
var tokenProtection = require('../../../../config/routeMiddleware');



 //http://stackoverflow.com/questions/15995461/node-js-pass-variable-to-route
var router = express.Router();

router.use(tokenProtection);
router.get('/', function(req, res){
  controller.getModelItems(req, res, MenuGroup);
});
router.get('/:id', function(req, res){
  controller.getModelItemById(req, res, MenuGroup);
});
router.delete('/:id', function(req, res){
  controller.deleteModelItem(req, res, MenuGroup);
});
router.put('/:id', function(req, res){
  controller.updateModelItem(req, res, MenuGroup);
});
router.post('/', function(req, res){
  controller.createModelItem(req, res, MenuGroup);
});


module.exports = router;